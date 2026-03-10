import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Checkbox } from "../../../components/form/Checkbox";
import { CheckboxGroup } from "../../../components/form/CheckboxGroup";
import { SelectInput } from "../../../components/form/SelectInput";
import { TextInput } from "../../../components/form/TextInput";
import { TextareaInput } from "../../../components/form/TextareaInput";
import type { MembershipRequestInput } from "../types/membership-request.types";

type SectionProps = {
	register: UseFormRegister<MembershipRequestInput>;
	errors: FieldErrors<MembershipRequestInput>;
};

export function PersonalInformationSection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">
				Personal Information
			</h3>

			<div className="grid sm:grid-cols-2 gap-5 md:gap-6">
				<TextInput
					placeholder="First Name *"
					{...register("first_name")}
					error={errors.first_name?.message}
				/>

				<TextInput
					placeholder="Last Name *"
					{...register("last_name")}
					error={errors.last_name?.message}
				/>
			</div>

			<TextInput
				type="email"
				placeholder="Email *"
				{...register("email")}
				error={errors.email?.message}
			/>

			<TextInput
				placeholder="Phone Number *"
				{...register("phone")}
				error={errors.phone?.message}
			/>

			<div className="grid sm:grid-cols-2 gap-5 md:gap-6">
				<TextInput
					type="date"
					{...register("birthdate")}
					error={errors.birthdate?.message}
				/>

				<SelectInput
					placeholder="Gender"
					options={[
						{ label: "Male", value: "male" },
						{ label: "Female", value: "female" },
						{ label: "Other", value: "other" },
					]}
					{...register("gender")}
					error={errors.gender?.message}
				/>
			</div>
		</section>
	);
}

export function LocationSection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">Location</h3>

			<TextInput
				{...register("country")}
				defaultValue="Philippines"
				error={errors.country?.message}
			/>

			<div className="grid sm:grid-cols-2 gap-5 md:gap-6">
				<TextInput
					placeholder="Province (Bulacan preferred) *"
					{...register("province")}
					error={errors.province?.message}
				/>

				<TextInput
					placeholder="City / Municipality *"
					{...register("city")}
					error={errors.city?.message}
				/>
			</div>

			<TextInput
				placeholder="Barangay"
				{...register("barangay")}
				error={errors.barangay?.message}
			/>

			<Checkbox
				label="I confirm I can regularly attend sessions around Malolos / Bulacan"
				{...register("location_confirmation")}
				error={errors.location_confirmation?.message}
			/>
		</section>
	);
}

export function TrainingProfileSection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">
				Training Profile
			</h3>

			<div>
				<p className="text-sm font-medium mb-3">Training Types</p>

				<CheckboxGroup
					name="training_types"
					options={[
						"running",
						"gym",
						"hybrid",
						"cycling",
						"triathlon",
					]}
					register={register}
					error={errors.training_types?.message}
				/>
			</div>

			<SelectInput
				placeholder="Experience Level"
				options={[
					{ label: "Beginner", value: "beginner" },
					{ label: "Intermediate", value: "intermediate" },
					{ label: "Advanced", value: "advanced" },
				]}
				{...register("experience_level")}
				error={errors.experience_level?.message}
			/>

			<div className="grid sm:grid-cols-2 gap-5 md:gap-6">
				<TextInput
					type="number"
					placeholder="Years Running"
					{...register("years_running")}
					error={errors.years_running?.message}
				/>

				<TextInput
					type="number"
					placeholder="Weekly Distance (km)"
					{...register("weekly_distance_km")}
					error={errors.weekly_distance_km?.message}
				/>
			</div>

			<TextInput
				placeholder="Average Pace (e.g. 5:30/km)"
				{...register("average_run_pace")}
				error={errors.average_run_pace?.message}
			/>

			<SelectInput
				placeholder="Preferred Run Time"
				options={[
					{ label: "Morning", value: "morning" },
					{ label: "Afternoon", value: "afternoon" },
					{ label: "Evening", value: "evening" },
				]}
				{...register("preferred_run_time")}
				error={errors.preferred_run_time?.message}
			/>

			<TextareaInput
				rows={3}
				placeholder="Running goals (fitness, race prep, social, etc.)"
				{...register("goals")}
				error={errors.goals?.message}
			/>
		</section>
	);
}

export function CommunityPlatformsSection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-8">
			<h3 className="text-lg md:text-xl font-semibold">
				Community Platforms
			</h3>

			<p className="text-sm text-neutral-600 max-w-prose">
				Facebook Group and Community Chat are required so we can contact
				you and add you to the main club group after approval.
			</p>

			<div className="space-y-3">
				<Checkbox
					label="Facebook Group (Required)"
					{...register("fb_group_joined")}
					error={errors.fb_group_joined?.message}
				/>

				<Checkbox
					label="Community Chat (Required)"
					{...register("community_chat_joined")}
					error={errors.community_chat_joined?.message}
				/>
			</div>

			<div className="space-y-3">
				<p className="text-sm font-medium">
					Other platforms you're part of
				</p>

				<CheckboxGroup
					name="platforms_joined"
					options={[
						"Facebook Page",
						"Instagram",
						"TikTok",
						"Strava Club",
					]}
					register={register}
					columns="grid-cols-2 sm:grid-cols-3"
					error={errors.platforms_joined?.message}
				/>
			</div>

			<div className="space-y-4">
				<TextInput
					placeholder="Facebook profile name used to join the group *"
					{...register("facebook_profile_name")}
					error={errors.facebook_profile_name?.message}
				/>

				<TextInput
					placeholder="Messenger display name *"
					{...register("messenger_name")}
					error={errors.messenger_name?.message}
				/>
			</div>
		</section>
	);
}

export function HealthSafetySection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">
				Health & Safety
			</h3>

			<TextInput
				placeholder="Emergency Contact Name *"
				{...register("emergency_contact_name")}
				error={errors.emergency_contact_name?.message}
			/>

			<TextInput
				placeholder="Emergency Contact Phone *"
				{...register("emergency_contact_phone")}
				error={errors.emergency_contact_phone?.message}
			/>

			<TextareaInput
				rows={3}
				placeholder="Medical conditions or injuries (if any)"
				{...register("medical_conditions")}
				error={errors.medical_conditions?.message}
			/>
		</section>
	);
}

export function MembershipExpectationsSection({
	register,
	errors,
}: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">
				Membership Expectations
			</h3>

			<Checkbox
				label="I understand I must attend at least 2 sessions before official membership"
				{...register("attendance_commitment")}
				error={errors.attendance_commitment?.message}
			/>

			<Checkbox
				label="I understand active members are expected to attend sessions regularly"
				{...register("activity_expectation")}
				error={errors.activity_expectation?.message}
			/>

			<Checkbox
				label="I agree to follow community rules and respect all members"
				{...register("community_behavior")}
				error={errors.community_behavior?.message}
			/>
		</section>
	);
}

export function CommunitySection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">Community</h3>

			<TextInput
				placeholder="How did you hear about us?"
				{...register("how_did_you_hear")}
				error={errors.how_did_you_hear?.message}
			/>

			<TextareaInput
				rows={3}
				placeholder="Why do you want to join the run club?"
				{...register("motivation")}
				error={errors.motivation?.message}
			/>
		</section>
	);
}

export function WaiverAgreementSection({ register, errors }: SectionProps) {
	return (
		<section className="space-y-6">
			<h3 className="text-lg md:text-xl font-semibold">
				Waiver & Participation Agreement
			</h3>

			<p className="text-sm text-neutral-600 max-w-prose">
				Please review and agree before submitting your application.
			</p>

			<div className="space-y-4">
				<Checkbox
					label="I confirm that I am physically capable of participating in running sessions and understand the risks involved."
					{...register("fitness_acknowledgment")}
					error={errors.fitness_acknowledgment?.message}
				/>

				<Checkbox
					label="I agree to follow all safety instructions, session guidelines, and community conduct standards."
					{...register("safety_commitment")}
					error={errors.safety_commitment?.message}
				/>

				<Checkbox
					label="I allow the club to capture and share photos/videos for announcements and community features."
					{...register("media_consent")}
					error={errors.media_consent?.message}
				/>

				<Checkbox
					label={
						<>
							I have read and agree to the{" "}
							<a
								href="/waiver-and-terms#waiver"
								className="underline"
							>
								Liability Waiver
							</a>
							,{" "}
							<a
								href="/waiver-and-terms#safety"
								className="underline"
							>
								Safety Policy
							</a>
							, and{" "}
							<a
								href="/waiver-and-terms#terms"
								className="underline"
							>
								Participation Terms
							</a>
							.
						</>
					}
					{...register("agreed_to_rules")}
					error={errors.agreed_to_rules?.message}
				/>
			</div>
		</section>
	);
}
