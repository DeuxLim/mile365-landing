import type { Member } from "@/features/admin/types/member.types";
import type { MembershipRequest } from "@/features/membership/types/membership-request.types";

type ReadonlyProps = {
	variant: "readonly";
	profile: Member;
	onClose: () => void;
};

type ReviewProps = {
	variant: "review";
	profile: MembershipRequest;
	onClose: () => void;
	onApprove: () => void;
	onReject: () => void;
};

type Props = ReadonlyProps | ReviewProps;

function StatusPill({ status }: { status: string }) {
	return (
		<span
			className={`px-4 py-1 rounded-full text-xs font-medium capitalize ${
				status === "approved"
					? "bg-green-500/20 text-green-300"
					: status === "rejected"
						? "bg-red-500/20 text-red-300"
						: status === "waitlisted"
							? "bg-blue-500/20 text-blue-300"
							: "bg-yellow-500/20 text-yellow-300"
			}`}
		>
			{status}
		</span>
	);
}

export default function ProfileModal(props: Props) {
	const { profile, onClose } = props;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
			<div className="w-275 max-h-[90vh] bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
				{/* Header */}
				<div className="sticky top-0 z-20 bg-linear-to-r from-zinc-900 to-zinc-800 text-white px-8 py-6 flex items-center justify-between">
					<div className="flex items-center gap-5">
						<div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-semibold">
							{profile.identity.first_name.charAt(0)}
							{profile.identity.last_name.charAt(0)}
						</div>

						<div>
							<h2 className="text-xl font-semibold">
								{profile.identity.first_name}{" "}
								{profile.identity.last_name}
							</h2>
							<p className="text-sm text-zinc-300">
								{profile.identity.email}
							</p>
							<p className="text-sm text-zinc-400">
								{profile.location.city},{" "}
								{profile.location.province}
							</p>
						</div>
					</div>

					{props.variant === "review" ? (
						<div className="flex items-center gap-4">
							<StatusPill status={props.profile.review.status} />
						</div>
					) : null}
				</div>

				{/* Compact Content */}
				<div className="flex-1 overflow-y-auto p-8 grid grid-cols-4 gap-10 text-xs">
					{/* Identity */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">Identity</h3>

						<div className="space-y-1">
							<p className="text-zinc-400">Phone</p>
							<p className="font-medium text-zinc-900">
								{profile.identity.phone}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Birthdate</p>
							<p className="font-medium text-zinc-900">
								{new Date(
									profile.identity.birthdate,
								).toLocaleDateString()}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Gender</p>
							<p className="font-medium text-zinc-900 capitalize">
								{profile.identity.gender}
							</p>
						</div>
					</div>

					{/* Location */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">Location</h3>

						<div className="space-y-1">
							<p className="text-zinc-400">Country</p>
							<p className="font-medium text-zinc-900">
								{profile.location.country}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Barangay</p>
							<p className="font-medium text-zinc-900">
								{profile.location.barangay}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">
								Location Confirmation
							</p>
							<span
								className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
									profile.location.location_confirmation
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								{profile.location.location_confirmation
									? "Confirmed"
									: "Not Confirmed"}
							</span>
						</div>
					</div>

					{/* Training */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">Training</h3>

						<div className="space-y-1">
							<p className="text-zinc-400">Training Types</p>
							<p className="font-medium text-zinc-900">
								{profile.training.training_types.join(", ")}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Experience Level</p>
							<p className="font-medium text-zinc-900">
								{profile.training.experience_level ?? "N/A"}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Years Running</p>
							<p className="font-medium text-zinc-900">
								{profile.training.years_running} yrs
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Weekly Distance</p>
							<p className="font-medium text-zinc-900">
								{profile.training.weekly_distance_km} km
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Average Run Pace</p>
							<p className="font-medium text-zinc-900">
								{profile.training.average_run_pace}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Preferred Run Time</p>
							<p className="font-medium text-zinc-900 capitalize">
								{profile.training.preferred_run_time ?? "N/A"}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Goals</p>
							<p className="font-medium text-zinc-900">
								{profile.training.goals}
							</p>
						</div>
					</div>

					{/* Health */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">Health</h3>

						<div className="space-y-1">
							<p className="text-zinc-400">Emergency Contact</p>
							<p className="font-medium text-zinc-900">
								{profile.health.emergency_contact_name}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Emergency Phone</p>
							<p className="font-medium text-zinc-900">
								{profile.health.emergency_contact_phone}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Medical Conditions</p>
							<p className="font-medium text-zinc-900">
								{profile.health.medical_conditions || "None"}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">
								Fitness Acknowledgment
							</p>
							<span
								className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
									profile.health.fitness_acknowledgment
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								{profile.health.fitness_acknowledgment
									? "Confirmed"
									: "Not Confirmed"}
							</span>
						</div>
					</div>

					{/* Community Platforms */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">
							Community Platforms
						</h3>

						<div className="space-y-1">
							<p className="text-zinc-400">FB Group Joined</p>
							<span
								className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
									profile.community_platforms.fb_group_joined
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								{profile.community_platforms.fb_group_joined
									? "Yes"
									: "No"}
							</span>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">
								Community Chat Joined
							</p>
							<span
								className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
									profile.community_platforms
										.community_chat_joined
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								{profile.community_platforms
									.community_chat_joined
									? "Yes"
									: "No"}
							</span>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Other Platforms</p>
							<p className="font-medium text-zinc-900">
								{profile.community_platforms.platforms_joined.join(
									", ",
								)}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">
								Facebook Profile Name
							</p>
							<p className="font-medium text-zinc-900">
								{
									profile.community_platforms
										.facebook_profile_name
								}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Messenger Name</p>
							<p className="font-medium text-zinc-900">
								{profile.community_platforms.messenger_name}
							</p>
						</div>
					</div>

					{/* Culture Fit */}
					<div className="col-span-2 space-y-3">
						<h3 className="font-semibold text-zinc-800">
							Culture Fit
						</h3>

						<div className="space-y-1">
							<p className="text-zinc-400">
								How did you hear about us?
							</p>
							<p className="font-medium text-zinc-900">
								{profile.culture_fit.how_did_you_hear}
							</p>
						</div>

						<div className="space-y-1">
							<p className="text-zinc-400">Motivation</p>
							<p className="font-medium text-zinc-900">
								{profile.culture_fit.motivation}
							</p>
						</div>
					</div>

					{/* Membership Expectations */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">
							Membership Expectations
						</h3>

						<span
							className={`inline-block px-2 py-1 rounded text-[10px] font-medium mr-2 ${
								profile.membership_expectations
									.attendance_commitment
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							Attendance Commitment
						</span>

						<span
							className={`inline-block px-2 py-1 rounded text-[10px] font-medium mr-2 ${
								profile.membership_expectations
									.activity_expectation
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							Activity Expectation
						</span>

						<span
							className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
								profile.membership_expectations
									.community_behavior
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							Community Behavior
						</span>
					</div>

					{/* Waiver & Agreement */}
					<div className="space-y-3">
						<h3 className="font-semibold text-zinc-800">
							Waiver & Agreement
						</h3>

						<span
							className={`inline-block px-2 py-1 rounded text-[10px] font-medium mr-2 ${
								profile.waiver.agreed_to_rules
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							Agreed to Rules
						</span>

						<span
							className={`inline-block px-2 py-1 rounded text-[10px] font-medium mr-2 ${
								profile.waiver.safety_commitment
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							Safety Commitment
						</span>

						<span
							className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
								profile.waiver.media_consent
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							Media Consent
						</span>
					</div>

					{/* Review */}
					{props.variant === "review" ? (
						<div className="col-span-2 space-y-3">
							<h3 className="font-semibold text-zinc-800">
								Review
							</h3>

								<div className="space-y-1">
									<p className="text-zinc-400">Reviewed By</p>
									<p className="font-medium text-zinc-900">
										{props.profile.review.reviewed_by ??
											"Not yet reviewed"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Admin Notes</p>
									<p className="font-medium text-zinc-900">
										{props.profile.review.admin_notes ??
											"None"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Reviewed At</p>
									<p className="font-medium text-zinc-900">
										{props.profile.review.reviewed_at ??
											"N/A"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Agreed At</p>
									<p className="font-medium text-zinc-900">
										{props.profile.review.agreed_at ??
											"N/A"}
									</p>
								</div>
						</div>
					) : null}
				</div>

				{/* Footer Actions */}
				<div className="sticky bottom-0 z-20 flex justify-end gap-4 px-8 py-6 border-t border-zinc-200 bg-zinc-50">
					<button
						onClick={onClose}
						className="px-6 py-2 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-100 transition"
					>
						Close
					</button>

					{props.variant === "review" ? (
						<>
							<button
								onClick={props.onReject}
								className="px-6 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition"
							>
								Reject
							</button>

							<button
								onClick={props.onApprove}
								className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition"
							>
								Approve
							</button>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}
