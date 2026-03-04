import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../admin.service";
import type { Member } from "../types/member.types";
import { useState } from "react";
import { getAge } from "@/utils/utils";

export default function MembersPage() {
	const [page, setPage] = useState(1);
	const { data, isPending, isError } = useQuery({
		queryKey: ["members", page],
		queryFn: () => getMembers(page),
		staleTime: 1000 * 60 * 60,
		placeholderData: (previousData) => previousData,
	});

	const [selected, setSelected] = useState<Member | null>(null);

	if (isPending) {
		return <div className="p-6">Loading membership requests...</div>;
	}

	if (isError || !data) {
		return <div className="p-6 text-red-500">Failed to load requests.</div>;
	}

	const members = data.data;
	const meta = data.meta;

	return (
		<div className="p-6 relative">
			<h1 className="text-2xl font-semibold">Membership Requests</h1>

			{/* TABLE */}
			<div className="pt-4"></div>

			<div className="overflow-x-auto rounded-md border border-zinc-200">
				<table className="min-w-full text-xs">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">Age</th>
							<th className="px-4 py-3">Gender</th>
							<th className="px-4 py-3">Location</th>
							<th className="px-4 py-3">Years Running</th>
							<th className="px-4 py-3">Medical Conditions</th>
							<th className="px-4 py-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{members.map((member: Member) => (
							<tr
								key={member.id}
								className="border-t border-zinc-200 hover:bg-gray-50"
							>
								<td className="px-4 py-3 font-medium">
									{member.identity.first_name}{" "}
									{member.identity.last_name}
								</td>
								<td className="px-4 py-3">
									{getAge(member.identity.birthdate)}
								</td>
								<td className="px-4 py-3 capitalize">
									{member.identity.gender}
								</td>
								<td className="px-4 py-3">
									{member.location.city},{" "}
									{member.location.province}
								</td>
								<td className="px-4 py-3">
									{member.training.years_running}
								</td>
								<td className="px-4 py-3">
									{member.health.medical_conditions || "None"}
								</td>
								<td className="px-4 py-3">
									<button
										onClick={() => setSelected(member)}
										className="text-blue-600 hover:underline"
									>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Table Pagination */}
				<div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 bg-zinc-50 text-xs">
					<button
						disabled={page === 1}
						onClick={() => setPage((p) => p - 1)}
						className="px-3 py-1 border border-zinc-200 rounded-md bg-white disabled:opacity-40 hover:bg-gray-50"
					>
						Previous
					</button>

					<div className="flex items-center gap-1">
						{page > 1 && (
							<button
								onClick={() => setPage(page - 1)}
								className="px-3 py-1 border border-zinc-200 rounded-md bg-white hover:bg-gray-50"
							>
								{page - 1}
							</button>
						)}

						<span className="px-3 py-1 rounded-md border border-zinc-200 bg-gray-100 text-zinc-900 font-medium">
							{page}
						</span>

						{page < meta.last_page && (
							<button
								onClick={() => setPage(page + 1)}
								className="px-3 py-1 border border-zinc-200 rounded-md bg-white hover:bg-gray-50"
							>
								{page + 1}
							</button>
						)}
					</div>

					<button
						disabled={page === meta.last_page}
						onClick={() => setPage((p) => p + 1)}
						className="px-3 py-1 border border-zinc-200 rounded-md bg-white disabled:opacity-40 hover:bg-gray-50"
					>
						Next
					</button>
				</div>
			</div>

			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
					<div className="w-275 max-h-[90vh] bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
						{/* Header */}
						<div className="sticky top-0 z-20 bg-linear-to-r from-zinc-900 to-zinc-800 text-white px-8 py-6 flex items-center justify-between">
							<div className="flex items-center gap-5">
								<div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-semibold">
									{selected.identity.first_name.charAt(0)}
									{selected.identity.last_name.charAt(0)}
								</div>

								<div>
									<h2 className="text-xl font-semibold">
										{selected.identity.first_name}{" "}
										{selected.identity.last_name}
									</h2>
									<p className="text-sm text-zinc-300">
										{selected.identity.email}
									</p>
									<p className="text-sm text-zinc-400">
										{selected.location.city},{" "}
										{selected.location.province}
									</p>
								</div>
							</div>
						</div>

						{/* Compact Content */}
						<div className="flex-1 overflow-y-auto p-8 grid grid-cols-4 gap-10 text-xs">
							{/* Identity */}
							<div className="space-y-3">
								<h3 className="font-semibold text-zinc-800">
									Identity
								</h3>

								<div className="space-y-1">
									<p className="text-zinc-400">Phone</p>
									<p className="font-medium text-zinc-900">
										{selected.identity.phone}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Birthdate</p>
									<p className="font-medium text-zinc-900">
										{new Date(
											selected.identity.birthdate,
										).toLocaleDateString()}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Gender</p>
									<p className="font-medium text-zinc-900 capitalize">
										{selected.identity.gender}
									</p>
								</div>
							</div>

							{/* Location */}
							<div className="space-y-3">
								<h3 className="font-semibold text-zinc-800">
									Location
								</h3>

								<div className="space-y-1">
									<p className="text-zinc-400">Country</p>
									<p className="font-medium text-zinc-900">
										{selected.location.country}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Barangay</p>
									<p className="font-medium text-zinc-900">
										{selected.location.barangay}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Location Confirmation
									</p>
									<span
										className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
											selected.location
												.location_confirmation
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{selected.location.location_confirmation
											? "Confirmed"
											: "Not Confirmed"}
									</span>
								</div>
							</div>

							{/* Training */}
							<div className="space-y-3">
								<h3 className="font-semibold text-zinc-800">
									Training
								</h3>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Training Types
									</p>
									<p className="font-medium text-zinc-900">
										{selected.training.training_types.join(
											", ",
										)}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Experience Level
									</p>
									<p className="font-medium text-zinc-900">
										{selected.training.experience_level ??
											"N/A"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Years Running
									</p>
									<p className="font-medium text-zinc-900">
										{selected.training.years_running} yrs
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Weekly Distance
									</p>
									<p className="font-medium text-zinc-900">
										{selected.training.weekly_distance_km}{" "}
										km
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Average Run Pace
									</p>
									<p className="font-medium text-zinc-900">
										{selected.training.average_run_pace}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Preferred Run Time
									</p>
									<p className="font-medium text-zinc-900 capitalize">
										{selected.training.preferred_run_time ??
											"N/A"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Goals</p>
									<p className="font-medium text-zinc-900">
										{selected.training.goals}
									</p>
								</div>
							</div>

							{/* Health */}
							<div className="space-y-3">
								<h3 className="font-semibold text-zinc-800">
									Health
								</h3>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Emergency Contact
									</p>
									<p className="font-medium text-zinc-900">
										{selected.health.emergency_contact_name}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Emergency Phone
									</p>
									<p className="font-medium text-zinc-900">
										{
											selected.health
												.emergency_contact_phone
										}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Medical Conditions
									</p>
									<p className="font-medium text-zinc-900">
										{selected.health.medical_conditions ||
											"None"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Fitness Acknowledgment
									</p>
									<span
										className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
											selected.health
												.fitness_acknowledgment
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{selected.health.fitness_acknowledgment
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
									<p className="text-zinc-400">
										FB Group Joined
									</p>
									<span
										className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
											selected.community_platforms
												.fb_group_joined
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{selected.community_platforms
											.fb_group_joined
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
											selected.community_platforms
												.community_chat_joined
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{selected.community_platforms
											.community_chat_joined
											? "Yes"
											: "No"}
									</span>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Other Platforms
									</p>
									<p className="font-medium text-zinc-900">
										{selected.community_platforms.platforms_joined.join(
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
											selected.community_platforms
												.facebook_profile_name
										}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">
										Messenger Name
									</p>
									<p className="font-medium text-zinc-900">
										{
											selected.community_platforms
												.messenger_name
										}
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
										{selected.culture_fit.how_did_you_hear}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Motivation</p>
									<p className="font-medium text-zinc-900">
										{selected.culture_fit.motivation}
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
										selected.membership_expectations
											.attendance_commitment
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									Attendance Commitment
								</span>

								<span
									className={`inline-block px-2 py-1 rounded text-[10px] font-medium mr-2 ${
										selected.membership_expectations
											.activity_expectation
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									Activity Expectation
								</span>

								<span
									className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
										selected.membership_expectations
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
										selected.waiver.agreed_to_rules
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									Agreed to Rules
								</span>

								<span
									className={`inline-block px-2 py-1 rounded text-[10px] font-medium mr-2 ${
										selected.waiver.safety_commitment
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									Safety Commitment
								</span>

								<span
									className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${
										selected.waiver.media_consent
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									Media Consent
								</span>
							</div>

							{/* Review */}
							<div className="col-span-2 space-y-3">
								<h3 className="font-semibold text-zinc-800">
									Review
								</h3>
							</div>
						</div>

						{/* Footer Actions */}
						<div className="sticky bottom-0 z-20 flex justify-end gap-4 px-8 py-6 border-t border-zinc-200 bg-zinc-50">
							<button
								onClick={() => setSelected(null)}
								className="px-6 py-2 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-100 transition"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
