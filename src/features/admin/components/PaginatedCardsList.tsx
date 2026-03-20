import type { ReactNode, Key } from "react";
import type {
	TablePagination,
	TableSearch,
	TableTabs,
} from "./PaginatedDataTable";

type Props<TData> = {
	rows: TData[];
	renderCard: (row: TData) => ReactNode;
	getRowKey: (row: TData) => Key;
	emptyMessage?: string;
	search?: TableSearch;
	tabs?: TableTabs;
	pagination?: TablePagination;
};

export default function PaginatedCardList<TData>({
	rows,
	renderCard,
	getRowKey,
	emptyMessage = "No results.",
	search,
	tabs,
	pagination,
}: Props<TData>) {
	return (
		<div className="flex flex-col gap-4">
			{/* SEARCH */}
			{search ? (
				<div className="flex items-center gap-2">
					<input
						value={search.value}
						onChange={(e) => search.onChange(e.target.value)}
						placeholder={search.placeholder ?? "Search..."}
						className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300"
					/>

					{search.value.length > 0 && search.onClear ? (
						<button
							onClick={search.onClear}
							className="px-3 py-2 text-sm rounded-md border border-zinc-200 bg-white hover:bg-gray-50"
						>
							Clear
						</button>
					) : null}
				</div>
			) : null}

			{/* TABS */}
			{tabs ? (
				<ul className="flex text-sm overflow-x-auto">
					{tabs.tabs.map((tab) => (
						<li
							key={tab.value}
							onClick={() => tabs.onChange(tab.value)}
							className={`px-4 py-2 border cursor-pointer whitespace-nowrap border-zinc-200 ${
								tabs.value === tab.value ? "bg-gray-100" : ""
							}`}
						>
							{tab.label}
						</li>
					))}
				</ul>
			) : null}

			{/* CARD LIST */}
			{rows.length === 0 ? (
				<div className="border border-zinc-200 rounded-md p-6 text-center text-zinc-500">
					{emptyMessage}
				</div>
			) : (
				<div className="flex flex-col gap-3">
					{rows.map((row) => (
						<div key={getRowKey(row)}>{renderCard(row)}</div>
					))}
				</div>
			)}

			{/* PAGINATION */}
			{pagination ? (
				<div className="flex items-center justify-between text-sm pt-2">
					<button
						disabled={pagination.page === 1}
						onClick={() =>
							pagination.onPageChange(pagination.page - 1)
						}
						className="px-3 py-1 border border-zinc-200 rounded-md bg-white disabled:opacity-40"
					>
						Previous
					</button>

					<span>
						Page {pagination.page} / {pagination.lastPage}
					</span>

					<button
						disabled={pagination.page === pagination.lastPage}
						onClick={() =>
							pagination.onPageChange(pagination.page + 1)
						}
						className="px-3 py-1 border border-zinc-200 rounded-md bg-white disabled:opacity-40"
					>
						Next
					</button>
				</div>
			) : null}
		</div>
	);
}
