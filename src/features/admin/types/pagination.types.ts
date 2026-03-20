export type PaginationMeta = {
	last_page: number;
	current_page?: number;
	per_page?: number;
	total?: number;
};

export type PaginatedResponse<TData> = {
	data: TData[];
	meta: PaginationMeta;
};
