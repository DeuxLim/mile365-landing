import { getAuthenticatedAdmin } from "@/features/admin/admin.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ADMIN_ME_QUERY_KEY = ["admin", "me"] as const;

export function useAuthenticatedAdmin() {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ADMIN_ME_QUERY_KEY,
		queryFn: getAuthenticatedAdmin,
		retry: false,
		staleTime: Infinity,
	});

	const setAdmin = (adminData: unknown) => {
		queryClient.setQueryData(ADMIN_ME_QUERY_KEY, adminData);
	};

	const clearAdmin = () => {
		queryClient.removeQueries({ queryKey: ADMIN_ME_QUERY_KEY });
	};

	return {
		...query,
		admin: query.data,
		setAdmin,
		clearAdmin,
	};
}
