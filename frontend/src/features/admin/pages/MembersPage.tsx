import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../admin.service";
import type { Member } from "../types/member.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAge } from "@/utils/utils";
import PaginatedDataTable, {
	type TableColumn,
} from "@/features/admin/components/PaginatedDataTable";
import ProfileModal from "@/features/admin/components/ProfileModal";
import PaginatedCardList from "../components/PaginatedCardsList";

export default function MembersPage() {
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState("");
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<Member | null>(null);
	const searchDebounceRef = useRef<ReturnType<
		typeof window.setTimeout
	> | null>(null);

	const columns: Array<TableColumn<Member>> = useMemo(
		() => [
			{
				header: "Name",
				renderCell: (member) => (
					<span className="font-medium">
						{member.identity.first_name} {member.identity.last_name}
					</span>
				),
			},
			{
				header: "Age",
				renderCell: (member) => getAge(member.identity.birthdate),
			},
			{
				header: "Gender",
				renderCell: (member) => (
					<span className="capitalize">{member.identity.gender}</span>
				),
			},
			{
				header: "Location",
				renderCell: (member) => (
					<>
						{member.location.city}, {member.location.province}
					</>
				),
			},
			{
				header: "Years Running",
				renderCell: (member) => member.training.years_running,
			},
			{
				header: "Medical Conditions",
				renderCell: (member) =>
					member.health.medical_conditions || "None",
			},
			{
				header: "Actions",
				renderCell: (member) => (
					<button
						onClick={() => setSelected(member)}
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
		queryKey: ["members", { page, search }],
		queryFn: () => getMembers(page, search),
		staleTime: 1000 * 60 * 60,
		placeholderData: (previousData) => previousData,
	});

	if (isPending) {
		return <div className="p-6">Loading members...</div>;
	}

	if (isError || !data) {
		return <div className="p-6 text-red-500">Failed to load members.</div>;
	}

	const members = data.data;
	const meta = data.meta;

	return (
		<div className="p-6 relative">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-2xl font-semibold">Members</h1>
			</div>

			{/* DESKTOP TABLE */}
			<div className="hidden md:block">
				<PaginatedDataTable
					columns={columns}
					rows={members}
					getRowKey={(member) => member.id}
					emptyMessage={
						search.length > 0
							? "No matching members."
							: "No members."
					}
					search={{
						value: searchInput,
						onChange: scheduleSearch,
						onClear: () => scheduleSearch(""),
						placeholder: "Search members...",
					}}
					pagination={{
						page,
						lastPage: meta.last_page,
						onPageChange: setPage,
					}}
				/>
			</div>

			{/* MOBILE CARD LIST */}
			<div className="md:hidden">
				<PaginatedCardList
					rows={members}
					getRowKey={(member) => member.id}
					emptyMessage={
						search.length > 0
							? "No matching members."
							: "No members."
					}
					search={{
						value: searchInput,
						onChange: scheduleSearch,
						onClear: () => scheduleSearch(""),
						placeholder: "Search members...",
					}}
					pagination={{
						page,
						lastPage: meta.last_page,
						onPageChange: setPage,
					}}
					renderCard={(member) => (
						<div className="border border-zinc-200 rounded-md p-4 bg-white space-y-2">
							<div className="font-medium">
								{member.identity.first_name}{" "}
								{member.identity.last_name}
							</div>

							<div className="text-sm text-zinc-600">
								Age: {getAge(member.identity.birthdate)}
							</div>

							<div className="text-sm text-zinc-600">
								{member.location.city},{" "}
								{member.location.province}
							</div>

							<div className="text-sm text-zinc-600">
								Years Running: {member.training.years_running}
							</div>

							<div className="text-sm text-zinc-600">
								Medical:{" "}
								{member.health.medical_conditions || "None"}
							</div>

							<button
								onClick={() => setSelected(member)}
								className="text-blue-600 text-sm hover:underline"
							>
								View
							</button>
						</div>
					)}
				/>
			</div>

			{selected ? (
				<ProfileModal
					variant="readonly"
					profile={selected}
					onClose={() => setSelected(null)}
				/>
			) : null}
		</div>
	);
}
