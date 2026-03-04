import { useCallback, useMemo, useState } from "react";
import type {
	LaravelValidationError,
	MembershipRequest,
} from "@/features/membership/types/membership-request.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	approveMembershipRequest,
	getMembershipRequests,
	rejectMembershipRequest,
} from "../admin.service";
import { getAge } from "@/utils/utils.js";
import type { AxiosError } from "axios";
import useToast from "@/contexts/Toast/useToast";
export default function MembershipRequestsPage() {
	const queryClient = useQueryClient();
	const toast = useToast();
	const [selectedStatus, setSelectedStatus] = useState("pending");

	const { data, isPending, isError } = useQuery({
		queryKey: ["membershipRequests"],
		queryFn: getMembershipRequests,
		staleTime: 1000 * 60 * 10,
	});

	const approveMutation = useMutation({
		mutationFn: approveMembershipRequest,

		onSuccess: (response) => {
			console.log(response.message);

			queryClient.invalidateQueries({
				queryKey: ["membershipRequests"],
			});

			toast.success("Request approved!");
			setSelected(null);
		},

		onError: (error: AxiosError<LaravelValidationError>) => {
			if (error.response?.status === 422) {
				console.log("Validation error:", error.response.data.errors);
			} else if (error.response?.status === 404) {
				console.log("Request not found.");
			} else {
				console.log("Unexpected error.");
			}

			toast.error("Unexpected error occured.");
		},
	});

	const rejectMutation = useMutation({
		mutationFn: rejectMembershipRequest,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["membershipRequests"],
			});

			setSelected(null);
		},

		onError: (error: AxiosError<LaravelValidationError>) => {
			if (error.response?.status === 422) {
				console.log(error.response.data.errors);
			}
		},
	});

	const handleMembershipRequestAction = useCallback(
		(id: string, action: string) => {
			if (action === "approve") {
				approveMutation.mutate(id);
			} else if (action === "reject") {
				rejectMutation.mutate(id);
			}
		},
		[approveMutation, rejectMutation],
	);

	const handleStatusSelection = useCallback((selectedStatus: string) => {
		setSelectedStatus(selectedStatus);
	}, []);

	const requests = useMemo(
		() =>
			data?.data.filter(
				(request: MembershipRequest) =>
					request.review.status === selectedStatus,
			),
		[data?.data, selectedStatus],
	);

	const [selected, setSelected] = useState<MembershipRequest | null>(null);

	if (isPending) {
		return <div className="p-6">Loading membership requests...</div>;
	}

	if (isError || !data) {
		return <div className="p-6 text-red-500">Failed to load requests.</div>;
	}

	return (
		<div className="p-6 relative">
			<h1 className="text-2xl font-semibold">Membership Requests</h1>

			{/* TABLE */}
			<div className="pt-4">
				<ul className="flex text-xs">
					<li
						onClick={() => handleStatusSelection("approved")}
						className={`px-4 py-1 rounded-sm border-b-0 border cursor-pointer border-zinc-200 ${selectedStatus === "approved" && `bg-gray-100`}`}
					>
						Approved
					</li>
					<li
						onClick={() => handleStatusSelection("rejected")}
						className={`px-4 py-1 rounded-sm border-b-0 border cursor-pointer border-zinc-200 ${selectedStatus === "rejected" && `bg-gray-100`}`}
					>
						Rejected
					</li>
					<li
						onClick={() => handleStatusSelection("pending")}
						className={`px-4 py-1 rounded-sm border-b-0 border cursor-pointer border-zinc-200 ${selectedStatus === "pending" && `bg-gray-100`}`}
					>
						Pending
					</li>
				</ul>
			</div>

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

							<div className="flex items-center gap-4">
								<span
									className={`px-4 py-1 rounded-full text-xs font-medium capitalize ${
										selected.review.status === "approved"
											? "bg-green-500/20 text-green-300"
											: selected.review.status ===
												  "rejected"
												? "bg-red-500/20 text-red-300"
												: "bg-yellow-500/20 text-yellow-300"
									}`}
								>
									{selected.review.status}
								</span>
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

								<div className="space-y-1">
									<p className="text-zinc-400">Reviewed By</p>
									<p className="font-medium text-zinc-900">
										{selected.review.reviewed_by ??
											"Not yet reviewed"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Admin Notes</p>
									<p className="font-medium text-zinc-900">
										{selected.review.admin_notes ?? "None"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Reviewed At</p>
									<p className="font-medium text-zinc-900">
										{selected.review.reviewed_at ?? "N/A"}
									</p>
								</div>

								<div className="space-y-1">
									<p className="text-zinc-400">Agreed At</p>
									<p className="font-medium text-zinc-900">
										{selected.review.agreed_at ?? "N/A"}
									</p>
								</div>
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

							<button
								onClick={() =>
									handleMembershipRequestAction(
										selected.id.toString(),
										"reject",
									)
								}
								className="px-6 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition"
							>
								Reject
							</button>

							<button
								onClick={() =>
									handleMembershipRequestAction(
										selected.id.toString(),
										"approve",
									)
								}
								className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition"
							>
								Approve
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
