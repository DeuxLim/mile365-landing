import type { Key, ReactNode } from "react";

export type TableColumn<TData> = {
	header: ReactNode;
	renderCell: (row: TData) => ReactNode;
	headerClassName?: string;
	cellClassName?: string;
};

export type TablePagination = {
	page: number;
	lastPage: number;
	onPageChange: (page: number) => void;
};

type Props<TData> = {
	columns: Array<TableColumn<TData>>;
	rows: Array<TData>;
	getRowKey: (row: TData) => Key;
	emptyMessage?: string;
	pagination?: TablePagination;
};

export default function PaginatedDataTable<TData>({
	columns,
	rows,
	getRowKey,
	emptyMessage = "No results.",
	pagination,
}: Props<TData>) {
	return (
		<div className="overflow-x-auto rounded-md border border-zinc-200">
			<table className="min-w-full text-xs">
				<thead className="bg-gray-100 text-left">
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								className={
									column.headerClassName ?? "px-4 py-3"
								}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.length === 0 ? (
						<tr className="border-t border-zinc-200">
							<td
								colSpan={columns.length}
								className="px-4 py-6 text-center text-zinc-500"
							>
								{emptyMessage}
							</td>
						</tr>
					) : (
						rows.map((row) => (
							<tr
								key={getRowKey(row)}
								className="border-t border-zinc-200 hover:bg-gray-50"
							>
								{columns.map((column, index) => (
									<td
										key={index}
										className={
											column.cellClassName ?? "px-4 py-3"
										}
									>
										{column.renderCell(row)}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>

			{pagination ? (
				<div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 bg-zinc-50 text-xs">
					<button
						disabled={pagination.page === 1}
						onClick={() =>
							pagination.onPageChange(pagination.page - 1)
						}
						className="px-3 py-1 border border-zinc-200 rounded-md bg-white disabled:opacity-40 hover:bg-gray-50"
					>
						Previous
					</button>

					<div className="flex items-center gap-1">
						{pagination.page > 1 ? (
							<button
								onClick={() =>
									pagination.onPageChange(pagination.page - 1)
								}
								className="px-3 py-1 border border-zinc-200 rounded-md bg-white hover:bg-gray-50"
							>
								{pagination.page - 1}
							</button>
						) : null}

						<span className="px-3 py-1 rounded-md border border-zinc-200 bg-gray-100 text-zinc-900 font-medium">
							{pagination.page}
						</span>

						{pagination.page < pagination.lastPage ? (
							<button
								onClick={() =>
									pagination.onPageChange(pagination.page + 1)
								}
								className="px-3 py-1 border border-zinc-200 rounded-md bg-white hover:bg-gray-50"
							>
								{pagination.page + 1}
							</button>
						) : null}
					</div>

					<button
						disabled={pagination.page === pagination.lastPage}
						onClick={() =>
							pagination.onPageChange(pagination.page + 1)
						}
						className="px-3 py-1 border border-zinc-200 rounded-md bg-white disabled:opacity-40 hover:bg-gray-50"
					>
						Next
					</button>
				</div>
			) : null}
		</div>
	);
}
