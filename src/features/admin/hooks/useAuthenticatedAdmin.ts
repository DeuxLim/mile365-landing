import { getAuthenticatedAdmin } from "@/features/admin/admin.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminApiToken } from "@/lib/admin-auth-token";
import { useEffect } from "react";
import type { AxiosError } from "axios";

const ADMIN_ME_QUERY_KEY = ["admin", "me"] as const;

export function useAuthenticatedAdmin() {
	const queryClient = useQueryClient();
	const hasToken = !!getAdminApiToken();

	const query = useQuery({
		queryKey: ADMIN_ME_QUERY_KEY,
		queryFn: getAuthenticatedAdmin,
		retry: false,
		staleTime: Infinity,
		enabled: hasToken,
	});

	const setAdmin = (adminData: unknown) => {
		queryClient.setQueryData(ADMIN_ME_QUERY_KEY, adminData);
	};

	const clearAdmin = () => {
		queryClient.removeQueries({ queryKey: ADMIN_ME_QUERY_KEY });
	};

	useEffect(() => {
		const axiosError = query.error as AxiosError | null;
		if (!axiosError?.response) return;
		if (axiosError.response.status !== 401) return;
		queryClient.removeQueries({ queryKey: ADMIN_ME_QUERY_KEY });
	}, [query.error, queryClient]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const handler = () => {
			queryClient.removeQueries({ queryKey: ADMIN_ME_QUERY_KEY });
		};
		window.addEventListener("admin-auth-cleared", handler);
		return () => window.removeEventListener("admin-auth-cleared", handler);
	}, [queryClient]);

	return {
		...query,
		admin: hasToken ? query.data : undefined,
		isAuthenticating: hasToken && query.fetchStatus === "fetching",
		setAdmin,
		clearAdmin,
	};
}
