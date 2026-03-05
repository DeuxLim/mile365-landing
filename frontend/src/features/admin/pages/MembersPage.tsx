import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../admin.service";
import type { Member } from "../types/member.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAge } from "@/utils/utils";
import PaginatedDataTable, {
	type TableColumn,
} from "@/features/admin/components/PaginatedDataTable";
import ProfileModal from "@/features/admin/components/ProfileModal";

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
				<div className="flex items-center gap-2">
					<input
						value={searchInput}
						onChange={(e) => scheduleSearch(e.target.value)}
						placeholder="Search members..."
						className="w-64 px-3 py-2 text-xs rounded-md border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300"
					/>
					{searchInput.length > 0 ? (
						<button
							onClick={() => scheduleSearch("")}
							className="px-3 py-2 text-xs rounded-md border border-zinc-200 bg-white hover:bg-gray-50"
						>
							Clear
						</button>
					) : null}
				</div>
			</div>

			{/* TABLE */}
			<div className="pt-4"></div>

			<PaginatedDataTable
				columns={columns}
				rows={members}
				getRowKey={(member) => member.id}
				emptyMessage={
					search.length > 0 ? "No matching members." : "No members."
				}
				pagination={{
					page,
					lastPage: meta.last_page,
					onPageChange: setPage,
				}}
			/>

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
