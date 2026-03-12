import { useState } from "react";
import type { Member } from "@/features/admin/types/member.types";
import type { MembershipRequest } from "@/features/membership/types/membership-request.types";
import { formatDate } from "@/utils/utils";

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
	setAdminNote: (note: string) => void;
};

type Props = ReadonlyProps | ReviewProps;

// --- Sub-components ---

function StatusPill({ status }: { status: string }) {
	const styles: Record<string, string> = {
		approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
		rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
		waitlisted: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
		pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
	};

	return (
		<span
			className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase ${
				styles[status] ?? styles.pending
			}`}
		>
			{status}
		</span>
	);
}

function Badge({ value }: { value: boolean }) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium ${
				value
					? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
					: "bg-red-50 text-red-700 ring-1 ring-red-200"
			}`}
		>
			<span
				className={`w-1.5 h-1.5 rounded-full ${value ? "bg-emerald-500" : "bg-red-500"}`}
			/>
			{value ? "Yes" : "No"}
		</span>
	);
}

function Field({
	label,
	hint,
	children,
}: {
	label: string;
	hint?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-1">
			<p className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400">
				{label}
			</p>
			<div className="text-sm font-medium text-zinc-800">{children}</div>
			{hint && (
				<p className="text-[11px] text-zinc-400 leading-relaxed">
					{hint}
				</p>
			)}
		</div>
	);
}

function SectionCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-xl bg-white ring-1 ring-zinc-200 p-5 space-y-4">
			<h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 pb-2 border-b border-zinc-100">
				{title}
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{children}
			</div>
		</div>
	);
}

// --- Tab Definitions ---

const TABS = [
	"Identity",
	"Training",
	"Health",
	"Community",
	"Agreements",
	"Review",
] as const;
type Tab = (typeof TABS)[number];

// --- Agreement field definitions used for validation ---
const AGREEMENT_FIELDS: { key: string; label: string }[] = [
	{ key: "location_confirmation", label: "Location Confirmation" },
	{ key: "fitness_acknowledgment", label: "Fitness Acknowledgment" },
	{ key: "fb_group_requested", label: "Facebook Group Requested" },
	{
		key: "fb_page_joined",
		label: "Facebook Page (at least one platform required)",
	},
	{ key: "attendance_commitment", label: "Attendance Commitment" },
	{ key: "activity_expectation", label: "Activity Expectation" },
	{ key: "community_behavior", label: "Community Behavior" },
	{ key: "agreed_to_rules", label: "Agreed to Rules (Waiver)" },
	{ key: "safety_commitment", label: "Safety Commitment" },
	{ key: "media_consent", label: "Media Consent" },
];

// --- Main Component ---

export default function ProfileModal(props: Props) {
	const { profile, onClose } = props;
	const [activeTab, setActiveTab] = useState<Tab>("Identity");
	const [showApproveWarning, setShowApproveWarning] = useState(false);

	const initials =
		profile.identity.first_name.charAt(0) +
		profile.identity.last_name.charAt(0);

	// Collect all agreements that are false — only relevant for review variant
	const unagreedFields =
		props.variant === "review"
			? AGREEMENT_FIELDS.filter((field) => {
					const p = props.profile;
					const allValues: Record<string, boolean> = {
						location_confirmation: p.location.location_confirmation,
						fitness_acknowledgment: p.health.fitness_acknowledgment,
						fb_group_requested:
							p.community_platforms.fb_group_requested,
						fb_page_joined: Array.isArray(
							p.community_platforms.platforms_joined,
						)
							? p.community_platforms.platforms_joined.includes(
									"Facebook Page",
								)
							: false,
						attendance_commitment:
							p.membership_expectations.attendance_commitment,
						activity_expectation:
							p.membership_expectations.activity_expectation,
						community_behavior:
							p.membership_expectations.community_behavior,
						agreed_to_rules: p.waiver.agreed_to_rules,
						safety_commitment: p.waiver.safety_commitment,
						media_consent: p.waiver.media_consent,
					};
					return allValues[field.key] === false;
				})
			: [];

	// Called when admin clicks Approve
	function handleApproveClick() {
		if (unagreedFields.length > 0) {
			setShowApproveWarning(true);
		} else if (props.variant === "review") {
			props.onApprove();
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
			{/* ── Approve Warning Popup ── */}
			{showApproveWarning && props.variant === "review" && (
				<div className="absolute inset-0 z-60 flex items-center justify-center p-4">
					<div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl ring-1 ring-zinc-200 overflow-hidden">
						{/* Warning header */}
						<div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border-b border-amber-100">
							<div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
								<svg
									className="w-4 h-4 text-amber-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
									/>
								</svg>
							</div>
							<div>
								<p className="text-sm font-semibold text-amber-800">
									Incomplete Agreements
								</p>
								<p className="text-xs text-amber-600">
									This requestor has not agreed to the
									following:
								</p>
							</div>
						</div>

						{/* Unagreed list */}
						<div className="px-5 py-4 space-y-2">
							{unagreedFields.map((field) => (
								<div
									key={field.key}
									className="flex items-center gap-2"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
									<p className="text-sm text-zinc-700">
										{field.label}
									</p>
								</div>
							))}
						</div>

						{/* Question + actions */}
						<div className="px-5 pb-5 space-y-3">
							<p className="text-xs text-zinc-500">
								Would you still like to approve this membership
								request?
							</p>
							<div className="flex gap-2">
								<button
									onClick={() => setShowApproveWarning(false)}
									className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 border border-zinc-200 hover:bg-zinc-50 transition"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										setShowApproveWarning(false);
										props.onApprove();
									}}
									className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-700 transition"
								>
									Approve Anyway
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{/* Modal */}
			<div className="w-full h-full sm:h-[85vh] sm:max-w-3xl bg-zinc-50 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-zinc-200">
				{/* ── Header ── */}
				<div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-6 pb-4 border-b border-zinc-200 bg-white">
					<div className="flex items-center gap-4">
						{/* Avatar */}
						<div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 ring-1 ring-zinc-200 flex items-center justify-center text-base font-bold text-white tracking-wide">
							{initials}
						</div>

						{/* Name block */}
						<div>
							<h2 className="text-base sm:text-lg font-semibold text-zinc-900 leading-tight">
								{profile.identity.first_name}{" "}
								{profile.identity.last_name}
							</h2>
							<p className="text-xs text-zinc-500 mt-0.5">
								{profile.identity.email}
							</p>
							<p className="text-xs text-zinc-400">
								{profile.location.city},{" "}
								{profile.location.province}
							</p>
						</div>
					</div>

					{/* Status + Close */}
					<div className="flex items-center gap-3 shrink-0 mt-0.5">
						{props.variant === "review" && (
							<StatusPill status={props.profile.review.status} />
						)}
						<button
							onClick={onClose}
							className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition"
							aria-label="Close"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* ── Tabs ── */}
				<div className="flex overflow-x-auto gap-1 px-5 sm:px-7 py-3 border-b border-zinc-200 bg-white scrollbar-hide">
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
								activeTab === tab
									? "bg-zinc-900 text-white"
									: "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* ── Tab Content ── */}
				<div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 space-y-5">
					{/* IDENTITY */}
					{activeTab === "Identity" && (
						<>
							<SectionCard title="Personal">
								<Field label="Phone">
									{profile.identity.phone}
								</Field>
								<Field label="Birthdate">
									{new Date(
										profile.identity.birthdate,
									).toLocaleDateString("en-PH", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</Field>
								<Field label="Gender">
									<span className="capitalize">
										{profile.identity.gender}
									</span>
								</Field>
							</SectionCard>

							<SectionCard title="Location">
								<Field label="Country">
									{profile.location.country}
								</Field>
								<Field label="City / Province">
									{profile.location.city},{" "}
									{profile.location.province}
								</Field>
								<Field label="Barangay">
									{profile.location.barangay}
								</Field>
							</SectionCard>
						</>
					)}

					{/* TRAINING */}
					{activeTab === "Training" && (
						<SectionCard title="Training Info">
							<Field label="Training Types">
								{profile.training.training_types?.join(", ") ||
									"N/A"}
							</Field>
							<Field label="Experience Level">
								{profile.training.experience_level ?? "N/A"}
							</Field>
							<Field label="Years Running">
								{profile.training.years_running} yrs
							</Field>
							<Field label="Weekly Distance">
								{profile.training.weekly_distance_km} km
							</Field>
							<Field label="Avg Run Pace">
								{profile.training.average_run_pace}
							</Field>
							<Field label="Preferred Run Time">
								<span className="capitalize">
									{profile.training.preferred_run_time ??
										"N/A"}
								</span>
							</Field>
							<div className="sm:col-span-2">
								<Field label="Goals">
									{profile.training.goals}
								</Field>
							</div>
						</SectionCard>
					)}

					{/* HEALTH */}
					{activeTab === "Health" && (
						<>
							<SectionCard title="Emergency Contact">
								<Field label="Name">
									{profile.health.emergency_contact_name}
								</Field>
								<Field label="Phone">
									{profile.health.emergency_contact_phone}
								</Field>
							</SectionCard>

							<SectionCard title="Medical">
								<div className="sm:col-span-2">
									<Field label="Medical Conditions">
										{profile.health.medical_conditions ||
											"None"}
									</Field>
								</div>
							</SectionCard>
						</>
					)}

					{/* COMMUNITY */}
					{activeTab === "Community" && (
						<>
							<SectionCard title="Platforms">
								<Field
									label="FB Group Joined"
									hint="Required. Member must have requested to join the Facebook Group."
								>
									<Badge
										value={
											profile.community_platforms
												.fb_group_requested
										}
									/>
								</Field>
								<Field label="Facebook Name">
									{
										profile.community_platforms
											.social_media_display_name
									}
								</Field>
								<div className="sm:col-span-2">
									<Field
										label="Other Platforms"
										hint="Required. Member must have liked the Facebook Page."
									>
										{profile.community_platforms.platforms_joined?.join(
											", ",
										) || "None"}
									</Field>
								</div>
							</SectionCard>

							<SectionCard title="Culture Fit">
								<div className="sm:col-span-2">
									<Field label="How did you hear about us?">
										{profile.culture_fit.how_did_you_hear}
									</Field>
								</div>
								<div className="sm:col-span-2">
									<Field label="Motivation">
										{profile.culture_fit.motivation}
									</Field>
								</div>
							</SectionCard>
						</>
					)}

					{/* AGREEMENTS */}
					{activeTab === "Agreements" && (
						<>
							<SectionCard title="Location">
								<Field
									label="Location Confirmed"
									hint="Member confirmed they can regularly attend sessions in Malolos / Bulacan."
								>
									<Badge
										value={
											profile.location
												.location_confirmation
										}
									/>
								</Field>
							</SectionCard>

							<SectionCard title="Fitness & Health">
								<Field
									label="Fitness Acknowledgment"
									hint="Member confirmed they are physically capable of joining sessions and accept personal responsibility for their health and safety."
								>
									<Badge
										value={
											profile.health
												.fitness_acknowledgment
										}
									/>
								</Field>
							</SectionCard>

							<SectionCard title="Membership Expectations">
								<Field
									label="Attendance Commitment"
									hint="Member understands they must complete at least 2 group sessions before official membership is confirmed."
								>
									<Badge
										value={
											profile.membership_expectations
												.attendance_commitment
										}
									/>
								</Field>
								<Field
									label="Activity Expectation"
									hint="Member understands that inactive members may be removed to keep the club engaged."
								>
									<Badge
										value={
											profile.membership_expectations
												.activity_expectation
										}
									/>
								</Field>
								<Field
									label="Community Behavior"
									hint="Member agreed to be respectful in all club spaces — group chats, sessions, and other club platforms."
								>
									<Badge
										value={
											profile.membership_expectations
												.community_behavior
										}
									/>
								</Field>
							</SectionCard>

							<SectionCard title="Waiver & Agreement">
								<Field
									label="Agreed to Rules"
									hint="Member agreed to the Liability Waiver, Safety Policy, and Participation Terms."
								>
									<Badge
										value={profile.waiver.agreed_to_rules}
									/>
								</Field>
								<Field
									label="Safety Commitment"
									hint="Member agreed to follow safety instructions, wear proper gear, and not join sessions when unwell."
								>
									<Badge
										value={profile.waiver.safety_commitment}
									/>
								</Field>
								<Field
									label="Media Consent"
									hint="Member allows the club to capture and share photos/videos on club platforms."
								>
									<Badge
										value={profile.waiver.media_consent}
									/>
								</Field>
							</SectionCard>
						</>
					)}

					{/* REVIEW */}
					{activeTab === "Review" && props.variant === "review" && (
						<SectionCard title="Review Details">
							<Field label="Reviewed By">
								{props.profile.review.reviewed_by ??
									"Not yet reviewed"}
							</Field>
							<Field label="Status">
								<StatusPill
									status={props.profile.review.status}
								/>
							</Field>
							<Field label="Reviewed At">
								{props.profile.review.reviewed_at
									? formatDate(
											props.profile.review.reviewed_at,
										)
									: "N/A"}
							</Field>
							<Field label="Agreed At">
								{props.profile.review.agreed_at ?? "N/A"}
							</Field>
							<div className="sm:col-span-2">
								<Field label="Admin Notes">
									{props.profile.review.admin_notes ?? "None"}
								</Field>
							</div>
						</SectionCard>
					)}

					{activeTab === "Review" && props.variant === "readonly" && (
						<div className="flex items-center justify-center h-32 text-zinc-400 text-sm">
							No review info available.
						</div>
					)}
				</div>

				{/* ── Footer ── */}
				<div className="border-t border-zinc-200 bg-white px-5 sm:px-7 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					{/* Admin note input — only for pending reviews */}
					{props.variant === "review" &&
						props.profile.review.status === "pending" && (
							<input
								type="text"
								className="flex-1 bg-zinc-50 border border-zinc-300 text-sm text-zinc-800 placeholder-zinc-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
								placeholder="Admin note (optional)..."
								onChange={(e) =>
									props.setAdminNote(e.target.value)
								}
							/>
						)}

					{/* Buttons */}
					<div className="flex gap-3 sm:ml-auto">
						<button
							onClick={onClose}
							className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-800 border border-zinc-200 hover:bg-zinc-50 transition"
						>
							Close
						</button>

						{props.variant === "review" &&
							props.profile.review.status === "pending" && (
								<>
									<button
										onClick={props.onReject}
										className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition"
									>
										Reject
									</button>
									<button
										onClick={handleApproveClick}
										className="px-5 py-2 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-700 transition"
									>
										Approve
									</button>
								</>
							)}
					</div>
				</div>
			</div>
		</div>
	);
}
