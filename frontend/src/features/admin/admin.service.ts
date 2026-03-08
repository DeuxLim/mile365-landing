import { api } from "@/lib/api";
import type {
	AdminAuthResponse,
	AdminLoginCredentials,
	AdminUser,
} from "./types/admin.types";
import type { PaginatedResponse } from "./types/pagination.types";
import type { MembershipRequest } from "@/features/membership/types/membership-request.types";
import type { Member } from "./types/member.types";

export const submitLoginCredentials = async (
	credentials: AdminLoginCredentials,
): Promise<AdminAuthResponse> => {
	await api.get("/sanctum/csrf-cookie");
	const response = await api.post<AdminAuthResponse>(
		"/admin/login",
		credentials,
	);
	return response.data;
};

export const getAuthenticatedAdmin = async (): Promise<AdminUser> => {
	const response = await api.get<AdminAuthResponse>("/admin/me");
	return response.data.user;
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

	const response = await api.get<PaginatedResponse<MembershipRequest>>(
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

	const response = await api.get<PaginatedResponse<Member>>(
		`/admin/members?${params.toString()}`,
	);
	return response.data;
};

export const logoutAdmin = async () => {
	const response = await api.post("/admin/logout");
	return response.data;
};

export const approveMembershipRequest = async ({
	membershipRequestId,
	adminNote,
}: {
	membershipRequestId: string;
	adminNote: string;
}) => {
	const response = await api.patch(
		`/admin/membership-requests/${membershipRequestId}/approve`,
		{ admin_notes: adminNote },
	);

	return response.data;
};

export const rejectMembershipRequest = async ({
	membershipRequestId,
	adminNote,
}: {
	membershipRequestId: string;
	adminNote: string;
}) => {
	const response = await api.patch(
		`/admin/membership-requests/${membershipRequestId}/reject`,
		{ admin_notes: adminNote },
	);

	return response.data;
};
