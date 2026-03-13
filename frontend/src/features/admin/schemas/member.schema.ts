import { z } from "zod";

/*
|--------------------------------------------------------------------------
| BASIC IDENTITY
|--------------------------------------------------------------------------
*/
export const identitySchema = z.object({
	first_name: z.string().trim().min(1, "First name is required."),
	last_name: z.string().trim().min(1, "Last name is required."),
	email: z
		.string()
		.trim()
		.min(1, "Email is required.")
		.email("Please enter a valid email address."),
	phone: z
		.string()
		.trim()
		.min(1, "Phone number is required.")
		.min(7, "Please enter a valid phone number."),
	birthdate: z.string().trim().min(1, "Birthdate is required."),
	gender: z.enum(["male", "female", "other"], {
		message: "Please select your gender.",
	}),
});

/*
|--------------------------------------------------------------------------
| LOCATION
|--------------------------------------------------------------------------
*/
export const locationSchema = z.object({
	country: z.string(),
	province: z.string().trim().min(1, "Province is required."),
	city: z.string().trim().min(1, "City is required."),
	barangay: z.string(),
	location_confirmation: z.boolean().refine((value) => value === true, {
		message: "Please confirm attendance around Malolos / Bulacan.",
	}),
});

/*
|--------------------------------------------------------------------------
| TRAINING PROFILE
|--------------------------------------------------------------------------
*/
export const trainingSchema = z.object({
	training_types: z.array(
		z.enum([
			"running",
			"cycling",
			"gym",
			"swimming",
			"walking",
			"yoga",
			"boxing",
			"other",
		]),
	),

	experience_level: z
		.union([
			z.enum(["beginner", "intermediate", "advanced"]),
			z.literal(""),
		])
		.optional()
		.transform((value) => (value === "" ? undefined : value)),

	years_running: z.coerce.number().int().nonnegative(),
	weekly_distance_km: z.coerce.number().nonnegative(),

	average_run_pace: z.string(),

	preferred_run_time: z
		.union([z.enum(["morning", "afternoon", "evening"]), z.literal("")])
		.optional()
		.transform((value) => (value === "" ? undefined : value)),

	goals: z.string(),
});

/*
|--------------------------------------------------------------------------
| COMMUNITY PLATFORMS
|--------------------------------------------------------------------------
*/
export const communityPlatformsSchema = z.object({
	fb_group_requested: z.boolean().refine((value) => value === true, {
		message: "Facebook Group Request is required.",
	}),
	platforms_followed: z
		.array(z.string())
		.min(1, "Please follow or join at least one platform."),

	social_media_display_name: z
		.string()
		.trim()
		.min(1, "Social media display name is required."),
});

/*
|--------------------------------------------------------------------------
| HEALTH & SAFETY
|--------------------------------------------------------------------------
*/
export const healthSafetySchema = z.object({
	emergency_contact_name: z
		.string()
		.trim()
		.min(1, "Emergency contact name is required."),
	emergency_contact_phone: z
		.string()
		.trim()
		.min(1, "Emergency contact phone is required.")
		.min(7, "Please enter a valid emergency contact phone number."),
	medical_conditions: z.string(),
	fitness_acknowledgment: z.boolean().refine((value) => value === true, {
		message: "Please confirm fitness acknowledgment.",
	}),
});

/*
|--------------------------------------------------------------------------
| MEMBERSHIP EXPECTATIONS
|--------------------------------------------------------------------------
*/
export const expectationsSchema = z.object({
	attendance_commitment: z.boolean().refine((value) => value === true, {
		message: "Please confirm attendance commitment.",
	}),
	activity_expectation: z.boolean().refine((value) => value === true, {
		message: "Please confirm activity expectation.",
	}),
	community_behavior: z.boolean().refine((value) => value === true, {
		message: "Please agree to community behavior.",
	}),
});

/*
|--------------------------------------------------------------------------
| COMMUNITY / CULTURE FIT
|--------------------------------------------------------------------------
*/
export const communitySchema = z.object({
	how_did_you_hear: z.string(),
	motivation: z.string(),
});

/*
|--------------------------------------------------------------------------
| WAIVER & AGREEMENT
|--------------------------------------------------------------------------
*/
export const waiverSchema = z.object({
	agreed_to_rules: z.boolean().refine((value) => value === true, {
		message: "You must agree to the waiver and terms.",
	}),
	safety_commitment: z.boolean().refine((value) => value === true, {
		message: "Please confirm safety commitment.",
	}),
	media_consent: z.boolean().refine((value) => value === true, {
		message: "Please confirm media consent.",
	}),
	agreed_at: z.string().datetime().optional(),
});

export const memberSchema = z.object({
	id: z.number(),
	identity: identitySchema,
	location: locationSchema,
	training: trainingSchema,
	community_platforms: communityPlatformsSchema,
	health: healthSafetySchema,
	membership_expectations: expectationsSchema,
	culture_fit: communitySchema,
	waiver: waiverSchema,
});
