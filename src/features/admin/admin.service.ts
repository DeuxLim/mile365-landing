import { adminApi } from "@/lib/api";
import { clearAdminAuthToken, setAdminApiToken } from "@/lib/admin-auth-token";
import type {
	AdminAuthResponse,
	AdminLoginCredentials,
	AdminUser,
} from "./types/admin.types";
import type { PaginatedResponse } from "./types/pagination.types";
import type {
	MembershipRequest,
	MembershipRequestStatus,
} from "@/features/membership/types/membership-request.types";
import type { Member } from "./types/member.types";

export const submitLoginCredentials = async (
	credentials: AdminLoginCredentials,
): Promise<AdminAuthResponse> => {
	const response = await adminApi.post<AdminAuthResponse>("/admin/login", credentials);
	setAdminApiToken(response.data.token);
	return response.data;
};

export const getAuthenticatedAdmin = async (): Promise<AdminUser> => {
	const response = await adminApi.get<{ user: AdminUser }>("/admin/me");
	return response.data.user;
};

export const logoutAdmin = async () => {
	try {
		const response = await adminApi.post("/admin/logout");
		return response.data;
	} finally {
		clearAdminAuthToken();
	}
};

export const getMembershipRequests = async (
	page: number,
	options?: { status?: string; search?: string },
): Promise<PaginatedResponse<MembershipRequest>> => {
	const params = new URLSearchParams();
	params.set("page", String(page));
	if (options?.status && options.status.trim().length > 0) {
		params.set("status", options.status.trim());
	}
	if (options?.search && options.search.trim().length > 0) {
		params.set("search", options.search.trim());
	}

	const response = await adminApi.get<PaginatedResponse<MembershipRequest>>(
		`/admin/membership-requests?${params.toString()}`,
	);
	return response.data;
};

export const getMembers = async (
	page: number,
	search?: string,
): Promise<PaginatedResponse<Member>> => {
	const params = new URLSearchParams();
	params.set("page", String(page));
	if (search && search.trim().length > 0) {
		params.set("search", search.trim());
	}

	const response = await adminApi.get<PaginatedResponse<Member>>(
		`/admin/members?${params.toString()}`,
	);
	return response.data;
};

export const updateMembershipRequestStatus = async ({
	membershipRequestId,
	adminNote,
	status,
}: {
	membershipRequestId: number;
	adminNote?: string;
	status: MembershipRequestStatus;
}): Promise<MembershipRequest> => {
	const response = await adminApi.patch(
		`/admin/membership-requests/${membershipRequestId}/status`,
		{ admin_notes: adminNote, status: status },
	);

	return response.data;
};

export const getDashboardStats = async () => {
	const response = await adminApi.get("/admin/dashboard/stats");
	return response.data;
};
