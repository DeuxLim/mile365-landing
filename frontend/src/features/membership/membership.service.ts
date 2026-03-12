import { api, sanctum } from "@/lib/api";
import type { MembershipRequestInput } from "@/features/membership/types/membership-request.types";

export async function submitMembershipRequest(payload: MembershipRequestInput) {
	await sanctum.get("/sanctum/csrf-cookie");
	const response = await api.post("membership-requests", payload);
	return response.data;
}
