import { useState } from "react";
import type { MembershipRequest } from "@/features/membership/types/membership-request.types";
import { useQuery } from "@tanstack/react-query";
import { getMembershipRequests } from "../admin.service";
import { getAge } from "@/utils/utils.js";
export default function MembershipRequestsPage() {
	const { data, isPending, isError } = useQuery({
		queryKey: ["membershipRequests"],
		queryFn: getMembershipRequests,
		staleTime: 1000 * 60 * 10,
	});

	const [selected, setSelected] = useState<MembershipRequest | null>(null);

	if (isPending) {
		return <div className="p-6">Loading membership requests...</div>;
	}

	if (isError || !data) {
		return <div className="p-6 text-red-500">Failed to load requests.</div>;
	}

	const requests = data.data;

	return (
		<div className="p-6 space-y-6 relative">
			<h1 className="text-2xl font-semibold">Membership Requests</h1>

			{/* TABLE */}
			<div className="overflow-x-auto rounded-md border border-zinc-200">
				<table className="min-w-full text-xs">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">Age</th>
							<th className="px-4 py-3">Gender</th>
							<th className="px-4 py-3">Location</th>
							<th className="px-4 py-3">Years Running</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3">Medical Conditions</th>
							<th className="px-4 py-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{requests.map((req: MembershipRequest) => (
							<tr
								key={req.id}
								className="border-t border-zinc-200 hover:bg-gray-50"
							>
								<td className="px-4 py-3 font-medium">
									{req.identity.first_name}{" "}
									{req.identity.last_name}
								</td>
								<td className="px-4 py-3">
									{getAge(req.identity.birthdate)}
								</td>
								<td className="px-4 py-3 capitalize">
									{req.identity.gender}
								</td>
								<td className="px-4 py-3">
									{req.location.city}, {req.location.province}
								</td>
								<td className="px-4 py-3">
									{req.training.years_running}
								</td>
								<td className="px-4 py-3">
									<span
										className={`px-2 py-1 rounded text-xs font-medium capitalize ${
											req.review.status === "pending"
												? "bg-yellow-100 text-yellow-700"
												: req.review.status ===
													  "approved"
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
										}`}
									>
										{req.review.status}
									</span>
								</td>
								<td className="px-4 py-3">
									{req.health.medical_conditions || "None"}
								</td>
								<td className="px-4 py-3">
									<button
										onClick={() => setSelected(req)}
										className="text-blue-600 hover:underline"
									>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* MODAL */}
			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="w-175 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-6 space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold">
								Request Details
							</h2>
							<button
								onClick={() => setSelected(null)}
								className="text-gray-500"
							>
								Close
							</button>
						</div>

						{/* Identity */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">Identity</h3>
							<p>
								Name: {selected.identity.first_name}{" "}
								{selected.identity.last_name}
							</p>
							<p>Email: {selected.identity.email}</p>
							<p>Phone: {selected.identity.phone}</p>
							<p>
								Birthdate:{" "}
								{new Date(
									selected.identity.birthdate,
								).toLocaleDateString()}
							</p>
							<p className="capitalize">
								Gender: {selected.identity.gender}
							</p>
						</section>

						{/* Location */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">Location</h3>
							<p>Country: {selected.location.country}</p>
							<p>
								{selected.location.city},{" "}
								{selected.location.province}
							</p>
							<p>Barangay: {selected.location.barangay}</p>
							<p>
								Location Confirmed:{" "}
								{selected.location.location_confirmation
									? "Yes"
									: "No"}
							</p>
						</section>

						{/* Training */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">Training</h3>
							<p>
								Training Types:{" "}
								{selected.training.training_types.join(", ")}
							</p>
							<p>
								Experience Level:{" "}
								{selected.training.experience_level ?? "N/A"}
							</p>
							<p>
								Years Running: {selected.training.years_running}
							</p>
							<p>
								Weekly Distance:{" "}
								{selected.training.weekly_distance_km} km
							</p>
							<p>
								Average Pace:{" "}
								{selected.training.average_run_pace}
							</p>
							<p>
								Preferred Time:{" "}
								{selected.training.preferred_run_time ?? "N/A"}
							</p>
							<p>Goals: {selected.training.goals}</p>
						</section>

						{/* Community Platforms */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">
								Community Platforms
							</h3>
							<p>
								FB Group Joined:{" "}
								{selected.community_platforms.fb_group_joined
									? "Yes"
									: "No"}
							</p>
							<p>
								Community Chat Joined:{" "}
								{selected.community_platforms
									.community_chat_joined
									? "Yes"
									: "No"}
							</p>
							<p>
								Other Platforms:{" "}
								{selected.community_platforms.platforms_joined.join(
									", ",
								)}
							</p>
							<p>
								Facebook Name:{" "}
								{
									selected.community_platforms
										.facebook_profile_name
								}
							</p>
							<p>
								Messenger Name:{" "}
								{selected.community_platforms.messenger_name}
							</p>
						</section>

						{/* Health */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">Health & Safety</h3>
							<p>
								Emergency Contact:{" "}
								{selected.health.emergency_contact_name}
							</p>
							<p>
								Emergency Phone:{" "}
								{selected.health.emergency_contact_phone}
							</p>
							<p>
								Medical Conditions:{" "}
								{selected.health.medical_conditions || "None"}
							</p>
							<p>
								Fitness Acknowledgment:{" "}
								{selected.health.fitness_acknowledgment
									? "Yes"
									: "No"}
							</p>
						</section>

						{/* Expectations */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">
								Membership Expectations
							</h3>
							<p>
								Attendance Commitment:{" "}
								{selected.membership_expectations
									.attendance_commitment
									? "Yes"
									: "No"}
							</p>
							<p>
								Activity Expectation:{" "}
								{selected.membership_expectations
									.activity_expectation
									? "Yes"
									: "No"}
							</p>
							<p>
								Community Behavior:{" "}
								{selected.membership_expectations
									.community_behavior
									? "Yes"
									: "No"}
							</p>
						</section>

						{/* Culture Fit */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">
								Community / Culture Fit
							</h3>
							<p>
								How they heard about us:{" "}
								{selected.culture_fit.how_did_you_hear}
							</p>
							<p>Motivation: {selected.culture_fit.motivation}</p>
						</section>

						{/* Waiver */}
						<section className="border-b pb-4 space-y-1">
							<h3 className="font-semibold">
								Waiver & Agreement
							</h3>
							<p>
								Agreed to Rules:{" "}
								{selected.waiver.agreed_to_rules ? "Yes" : "No"}
							</p>
							<p>
								Safety Commitment:{" "}
								{selected.waiver.safety_commitment
									? "Yes"
									: "No"}
							</p>
							<p>
								Media Consent:{" "}
								{selected.waiver.media_consent ? "Yes" : "No"}
							</p>
						</section>

						{/* Review Info */}
						<section className="space-y-2">
							<h3 className="font-semibold">Review</h3>
							<p>Status: {selected.review.status}</p>
							<p>
								Reviewed By:{" "}
								{selected.review.reviewed_by ??
									"Not yet reviewed"}
							</p>
							<p>
								Reviewed At:{" "}
								{selected.review.reviewed_at ?? "N/A"}
							</p>
							<p>
								Admin Notes:{" "}
								{selected.review.admin_notes ?? "None"}
							</p>

							<textarea
								className="w-full border rounded p-2 text-sm"
								placeholder="Admin notes..."
							/>

							<div className="flex gap-3 pt-2">
								<button className="bg-green-600 text-white px-4 py-2 rounded">
									Approve
								</button>
								<button className="bg-red-600 text-white px-4 py-2 rounded">
									Reject
								</button>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	);
}
