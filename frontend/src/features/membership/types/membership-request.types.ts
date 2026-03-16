import { z } from "zod";
import type {
	membershipRequestInputSchema,
	membershipRequestSchema,
} from "../schemas/membership-request.schema";

export type MembershipRequest = z.infer<typeof membershipRequestSchema>;
export type MembershipRequestInput = z.input<
	typeof membershipRequestInputSchema
>;
export type MembershipRequestOutput = z.output<
	typeof membershipRequestInputSchema
>;
export type LaravelValidationError = {
	message: string;
	errors: Record<string, string[]>;
};
export type MembershipRequestStatus =
	| "pending"
	| "trial"
	| "approved"
	| "rejected"
	| "waitlisted";
