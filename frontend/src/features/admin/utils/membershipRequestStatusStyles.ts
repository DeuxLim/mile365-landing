import type { MembershipRequestStatus } from "@/features/membership/types/membership-request.types";

export type MembershipRequestStatusStyleVariant = "compact" | "pill";

const STATUS_STYLES: Record<
	MembershipRequestStatus,
	Record<MembershipRequestStatusStyleVariant, string>
> = {
	pending: {
		compact: "bg-yellow-100 text-yellow-700",
		pill: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
	},
	trial: {
		compact: "bg-blue-100 text-blue-700",
		pill: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
	},
	approved: {
		compact: "bg-green-100 text-green-700",
		pill: "bg-green-50 text-green-700 ring-1 ring-green-200",
	},
	rejected: {
		compact: "bg-red-100 text-red-700",
		pill: "bg-red-50 text-red-700 ring-1 ring-red-200",
	},
	waitlisted: {
		compact: "bg-blue-100 text-blue-700",
		pill: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
	},
};

export function getMembershipRequestStatusClasses(
	status: string,
	variant: MembershipRequestStatusStyleVariant = "compact",
): string {
	const normalizedStatus = status
		.toLowerCase()
		.trim() as MembershipRequestStatus;
	return (
		STATUS_STYLES[normalizedStatus]?.[variant] ??
		STATUS_STYLES.pending[variant]
	);
}
