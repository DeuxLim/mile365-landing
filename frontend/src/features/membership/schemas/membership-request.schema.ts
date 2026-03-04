import {
	communityPlatformsSchema,
	communitySchema,
	expectationsSchema,
	healthSafetySchema,
	identitySchema,
	locationSchema,
	trainingSchema,
	waiverSchema,
} from "@/features/admin/schemas/member.schema";
import { z } from "zod";

/*
|--------------------------------------------------------------------------
| ADMIN / BACKOFFICE
|--------------------------------------------------------------------------
*/
export const adminSchema = z.object({
	agreed_at: z.string().datetime().optional(),
	status: z
		.enum(["pending", "approved", "rejected"], {
			message: "Please select a valid status.",
		})
		.default("pending"),
	reviewed_by: z.string().nullable().optional(),
	reviewed_at: z.string().datetime().nullable().optional(),
	admin_notes: z.string().nullable().optional(),
});

export const membershipRequestSchema = z.object({
	id: z.number(),
	identity: identitySchema,
	location: locationSchema,
	training: trainingSchema,
	community_platforms: communityPlatformsSchema,
	health: healthSafetySchema,
	membership_expectations: expectationsSchema,
	culture_fit: communitySchema,
	waiver: waiverSchema,
	review: adminSchema,
});

export const membershipRequestInputSchema = z.object({
	...identitySchema.shape,
	...locationSchema.shape,
	...trainingSchema.shape,
	...communityPlatformsSchema.shape,
	...healthSafetySchema.shape,
	...expectationsSchema.shape,
	...communitySchema.shape,
	...waiverSchema.shape,
	...adminSchema.shape,
});
