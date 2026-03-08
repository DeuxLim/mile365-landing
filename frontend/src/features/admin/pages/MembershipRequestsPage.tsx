import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
	LaravelValidationError,
	MembershipRequest,
} from "@/features/membership/types/membership-request.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	approveMembershipRequest,
	getMembershipRequests,
	rejectMembershipRequest,
} from "../admin.service";
import { getAge } from "@/utils/utils.js";
import type { AxiosError } from "axios";
import useToast from "@/contexts/Toast/useToast";
import PaginatedDataTable, {
	type TableColumn,
} from "@/features/admin/components/PaginatedDataTable";
import ProfileModal from "@/features/admin/components/ProfileModal";
import PaginatedCardList from "../components/PaginatedCardsList";
import MembershipRequestCard from "../components/MembershipRequestCard";

export default function MembershipRequestsPage() {
	const queryClient = useQueryClient();
	const toast = useToast();
	const [selectedStatus, setSelectedStatus] = useState("pending");
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState("");
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<MembershipRequest | null>(null);
	const [adminNote, setAdminNote] = useState("");
	const searchDebounceRef = useRef<ReturnType<
		typeof window.setTimeout
	> | null>(null);

	const columns: Array<TableColumn<MembershipRequest>> = useMemo(
		() => [
			{
				header: "Name",
				renderCell: (req) => (
					<span className="font-medium">
						{req.identity.first_name} {req.identity.last_name}
					</span>
				),
			},
			{
				header: "Age",
				renderCell: (req) => getAge(req.identity.birthdate),
			},
			{
				header: "Gender",
				renderCell: (req) => (
					<span className="capitalize">{req.identity.gender}</span>
				),
			},
			{
				header: "Location",
				renderCell: (req) => (
					<>
						{req.location.city}, {req.location.province}
					</>
				),
			},
			{
				header: "Years Running",
				renderCell: (req) => req.training.years_running,
			},
			{
				header: "Status",
				renderCell: (req) => (
					<span
						className={`px-2 py-1 rounded text-xs font-medium capitalize ${
							req.review.status === "pending"
								? "bg-yellow-100 text-yellow-700"
								: req.review.status === "approved"
									? "bg-green-100 text-green-700"
									: req.review.status === "waitlisted"
										? "bg-blue-100 text-blue-700"
										: "bg-red-100 text-red-700"
						}`}
					>
						{req.review.status}
					</span>
				),
			},
			{
				header: "Medical Conditions",
				renderCell: (req) => req.health.medical_conditions || "None",
			},
			{
				header: "Actions",
				renderCell: (req) => (
					<button
						onClick={() => {
							setAdminNote("");
							setSelected(req);
						}}
						className="text-blue-600 hover:underline"
					>
						View
					</button>
				),
			},
		],
		[setSelected],
	);

	const scheduleSearch = useCallback((nextInput: string) => {
		setSearchInput(nextInput);

		if (searchDebounceRef.current) {
			window.clearTimeout(searchDebounceRef.current);
		}

		searchDebounceRef.current = window.setTimeout(() => {
			const nextSearch = nextInput.trim();
			setPage(1);
			setSearch(nextSearch);
		}, 250);
	}, []);

	useEffect(() => {
		return () => {
			if (searchDebounceRef.current) {
				window.clearTimeout(searchDebounceRef.current);
			}
		};
	}, []);

	const { data, isPending, isError } = useQuery({
		queryKey: ["membershipRequests", { page, selectedStatus, search }],
		queryFn: () =>
			getMembershipRequests(page, {
				status: selectedStatus,
				search,
			}),
		staleTime: 1000 * 60 * 10,
		placeholderData: (previous) => previous,
	});

	const approveMutation = useMutation({
		mutationFn: approveMembershipRequest,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["membershipRequests"],
			});

			toast.success("Request approved");
			setSelected(null);
			setAdminNote("");
		},

		onError: (error: AxiosError<LaravelValidationError>) => {
			toast.error(
				error.response?.data.message ?? "Unexpected error occured.",
			);
		},
	});

	const rejectMutation = useMutation({
		mutationFn: rejectMembershipRequest,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["membershipRequests"],
			});

			toast.success("Request rejected");
			setSelected(null);
			setAdminNote("");
		},

		onError: (error: AxiosError<LaravelValidationError>) => {
			toast.error(
				error.response?.data.message ?? "Unexpected error occured.",
			);
		},
	});

	const handleMembershipRequestAction = useCallback(
		(id: string, action: string) => {
			if (action === "approve") {
				approveMutation.mutate({
					membershipRequestId: id,
					adminNote,
				});
			}

			if (action === "reject") {
				rejectMutation.mutate({
					membershipRequestId: id,
					adminNote,
				});
			}
		},
		[approveMutation, rejectMutation, adminNote],
	);

	const handleStatusSelection = useCallback((status: string) => {
		setSelectedStatus(status);
		setPage(1);
	}, []);

	if (isPending) {
		return <div className="p-6">Loading membership requests...</div>;
	}

	if (isError || !data) {
		return <div className="p-6 text-red-500">Failed to load requests.</div>;
	}

	const meta = data.meta;

	return (
		<div className="p-6 relative">
			<h1 className="text-2xl font-semibold">Membership Requests</h1>

			<PaginatedDataTable
				columns={columns}
				rows={data.data}
				getRowKey={(req) => req.id}
				emptyMessage={
					search.length > 0 ? "No matching requests." : "No requests."
				}
				search={{
					value: searchInput,
					onChange: scheduleSearch,
					onClear: () => scheduleSearch(""),
					placeholder: "Search requests...",
				}}
				tabs={{
					value: selectedStatus,
					onChange: handleStatusSelection,
					tabs: [
						{ label: "Approved", value: "approved" },
						{ label: "Rejected", value: "rejected" },
						{ label: "Pending", value: "pending" },
					],
				}}
				pagination={{
					page,
					lastPage: meta.last_page,
					onPageChange: setPage,
				}}
			/>

			<div className="md:hidden my-4">
				<PaginatedCardList
					rows={data.data}
					getRowKey={(req) => req.id}
					renderCard={(req) => (
						<MembershipRequestCard
							request={req}
							onView={() => {
								setAdminNote("");
								setSelected(req);
							}}
						/>
					)}
					search={{
						value: searchInput,
						onChange: scheduleSearch,
						onClear: () => scheduleSearch(""),
						placeholder: "Search requests...",
					}}
					tabs={{
						value: selectedStatus,
						onChange: handleStatusSelection,
						tabs: [
							{ label: "Approved", value: "approved" },
							{ label: "Rejected", value: "rejected" },
							{ label: "Pending", value: "pending" },
						],
					}}
					pagination={{
						page,
						lastPage: meta.last_page,
						onPageChange: setPage,
					}}
				/>
			</div>

			{selected ? (
				<ProfileModal
					variant="review"
					profile={selected}
					onClose={() => setSelected(null)}
					onReject={() =>
						handleMembershipRequestAction(
							selected.id.toString(),
							"reject",
						)
					}
					onApprove={() =>
						handleMembershipRequestAction(
							selected.id.toString(),
							"approve",
						)
					}
					setAdminNote={setAdminNote}
				/>
			) : null}
		</div>
	);
}
