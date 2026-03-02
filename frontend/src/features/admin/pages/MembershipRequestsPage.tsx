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
									{req.identity.first_name +
										" " +
										req.identity.last_name}
								</td>

								<td className="px-4 py-3">
									{getAge(req.identity.birthdate)}
								</td>

								<td className="px-4 py-3">
									{req.identity.gender}
								</td>

								<td className="px-4 py-3">
									{req.location.city}, {req.location.province}
								</td>

								<td className="px-4 py-3 capitalize">
									{req.training.years_running}
								</td>

								<td className="px-4 py-3">
									<span
										className={`px-2 py-1 rounded text-xs font-medium ${
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
									{req.health.medical_conditions}
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

			{/* DRAWER */}
			{selected && (
				<div className="fixed inset-0 bg-black/30 flex justify-end">
					<div className="w-125 bg-white h-full p-6 overflow-y-auto space-y-6">
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
						<section>
							<h3 className="font-semibold mb-2">Identity</h3>
							<p>Email: {selected.identity.email}</p>
							<p>Phone: {selected.identity.phone}</p>
							<p>Gender: {selected.identity.gender}</p>
						</section>

						{/* Location */}
						<section>
							<h3 className="font-semibold mb-2">Location</h3>
							<p>
								{selected.location.city},{" "}
								{selected.location.province}
							</p>
							<p>Barangay: {selected.location.barangay}</p>
						</section>

						{/* Training */}
						<section>
							<h3 className="font-semibold mb-2">Training</h3>
							<p>Level: {selected.training.experience_level}</p>
							<p>
								Weekly Distance:{" "}
								{selected.training.weekly_distance_km} km
							</p>
							<p>
								Preferred Time:{" "}
								{selected.training.preferred_run_time}
							</p>
							<p>Goals: {selected.training.goals}</p>
						</section>

						{/* Health */}
						<section>
							<h3 className="font-semibold mb-2">Health</h3>
							<p>
								Emergency Contact:{" "}
								{selected.health.emergency_contact_name}
							</p>
							<p>
								Medical Conditions:{" "}
								{selected.health.medical_conditions}
							</p>
						</section>

						{/* Review Controls */}
						<section className="pt-4 border-t space-y-3">
							<h3 className="font-semibold">Review</h3>

							<textarea
								className="w-full border rounded p-2 text-sm"
								placeholder="Admin notes..."
							/>

							<div className="flex gap-3">
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
