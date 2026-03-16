import type { MembershipRequest } from "@/features/membership/types/membership-request.types";
import { getAge } from "@/utils/utils";
import { getMembershipRequestStatusClasses } from "@/features/admin/utils/membershipRequestStatusStyles";

type Props = {
	request: MembershipRequest;
	onView: () => void;
};

export default function MembershipRequestCard({ request, onView }: Props) {
	return (
		<div className="border border-zinc-200 rounded-md p-4 bg-white space-y-3">
			<div className="flex items-center justify-between">
				<div className="font-medium">
					{request.identity.first_name} {request.identity.last_name}
				</div>

				<span
					className={`px-2 py-1 rounded text-xs font-medium capitalize ${getMembershipRequestStatusClasses(
						request.review.status,
					)}`}
				>
					{request.review.status}
				</span>
			</div>

			<div className="text-sm text-zinc-600">
				Age: {getAge(request.identity.birthdate)}
			</div>

			<div className="text-sm text-zinc-600">
				{request.location.city}, {request.location.province}
			</div>

			<div className="text-sm text-zinc-600">
				Years Running: {request.training.years_running}
			</div>

			<div className="text-sm text-zinc-600">
				Medical: {request.health.medical_conditions || "None"}
			</div>

			<button
				onClick={onView}
				className="text-blue-600 text-sm hover:underline"
			>
				View Details
			</button>
		</div>
	);
}
