import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";

export default function JoinSuccess() {
	const location = useLocation();
	const applicationId = location.state?.applicationId;
	const [stage, setStage] = useState(0);

	// scroll to top on page load
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	// staged processing animation (mobile-friendly pacing)
	useEffect(() => {
		const timers = [
			setTimeout(() => setStage(1), 1500),
			setTimeout(() => setStage(2), 3200),
		];

		return () => timers.forEach(clearTimeout);
	}, []);

	return (
		<div
			className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 md:pt-28 md:pb-16 bg-white text-black"
			data-theme="light"
		>
			<div className="max-w-xl w-full text-center space-y-6 animate-[fadeIn_.6s_ease-out]">
				{/* Success badge */}
				<div className="relative mx-auto w-20 h-20 md:w-24 md:h-24">
					<div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-60" />

					<div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500 text-white text-2xl md:text-3xl font-bold">
						✓
					</div>
				</div>

				{/* Stage messaging */}
				<div className="space-y-3">
					{stage === 0 && (
						<p className="text-neutral-500 animate-pulse text-sm md:text-base">
							Submitting application…
						</p>
					)}

					{stage === 1 && (
						<p className="text-neutral-500 animate-pulse text-sm md:text-base">
							Reviewing details…
						</p>
					)}

					{stage === 2 && (
						<>
							<h1 className="text-2xl md:text-3xl font-semibold tracking-tight animate-[fadeIn_.4s_ease-out]">
								Application received
							</h1>

							<p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-md mx-auto animate-[fadeIn_.6s_ease-out]">
								Your membership request has been submitted
								successfully and is now under review.
							</p>
						</>
					)}
				</div>

				{/* Reference ID */}
				{stage === 2 && (
					<div className="bg-neutral-100 rounded-lg p-4 text-sm animate-[fadeIn_.9s_ease-out]">
						Reference ID: #{applicationId}
					</div>
				)}

				{/* What happens next */}
				{stage === 2 && (
					<div className="animate-[fadeIn_.8s_ease-out] text-left bg-neutral-50 border border-neutral-200 rounded-lg p-4 md:p-5 space-y-3">
						<p className="text-sm font-semibold">
							What happens next?
						</p>

						<ul className="text-sm text-neutral-600 space-y-2">
							<li>• Our team reviews your application</li>
							<li>• Messenger group invite via email</li>
							<li>• You’ll be invited to upcoming sessions</li>
						</ul>

						<p className="text-xs text-neutral-500">
							Review usually takes 24–72 hours.
						</p>

						<p className="text-xs text-neutral-500">
							You don’t need to submit another request.
						</p>
					</div>
				)}

				{/* Back button */}
				<Link
					to="/"
					className="inline-block mt-6 bg-black text-white px-5 py-3 text-xs md:text-sm uppercase tracking-widest"
				>
					Back to homepage
				</Link>
			</div>
		</div>
	);
}
