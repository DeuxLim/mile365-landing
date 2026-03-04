import { api } from "@/lib/api";
import type {
	AdminAuthResponse,
	AdminLoginCredentials,
	AdminUser,
} from "./types/admin.types";
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

export const getMembershipRequests = async () => {
	const response = await api.get("/admin/membership-requests");
	return response.data;
};

export const getMembers = async (): Promise<Member[]> => {
	const response = await api.get("/admin/members");
	return response.data.data;
};

export const logoutAdmin = async () => {
	const response = await api.post("/admin/logout");
	return response.data;
};

export const approveMembershipRequest = async (membershipRequestId: string) => {
	const response = await api.patch(
		`/admin/membership-requests/${membershipRequestId}/approve`,
	);
	return response.data;
};

export const rejectMembershipRequest = async (membershipRequestId: string) => {
	const response = await api.patch(
		`/admin/membership-requests/${membershipRequestId}/reject`,
	);
	return response.data;
};
