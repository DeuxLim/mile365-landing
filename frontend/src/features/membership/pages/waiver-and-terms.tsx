export default function WaiverAndTermsPage() {
	return (
		<main
			className="max-w-3xl mx-auto px-5 py-14 md:py-20 space-y-14"
			data-theme="dark"
		>
			<header className="space-y-3">
				<h1 className="text-2xl md:text-3xl font-semibold">
					Waiver & Participation Terms
				</h1>
				<p className="text-sm text-neutral-600">
					Last updated: March 2026 • Version 1.0
				</p>
			</header>

			{/* LIABILITY WAIVER */}
			<section id="waiver" className="space-y-5">
				<h2 className="text-xl font-semibold">Liability Waiver</h2>

				<p className="text-sm leading-relaxed">
					By joining and participating in the run club’s training
					sessions, events, and community activities, you acknowledge
					that running and physical exercise involve inherent risks
					including, but not limited to, injury, accidents, illness,
					property damage, and unforeseen physical strain.
				</p>

				<p className="text-sm leading-relaxed">
					You voluntarily assume full responsibility for any risks,
					injuries, or damages that may occur during participation in
					club-related activities, whether caused by negligence or
					otherwise.
				</p>

				<p className="text-sm leading-relaxed">
					The run club, its organizers, coaches, volunteers, and
					partners shall not be held liable for any personal injury,
					loss, damage, or incident that may occur before, during, or
					after training sessions, races, group runs, or events.
				</p>

				<p className="text-sm leading-relaxed">
					Participation is entirely voluntary. You agree that you are
					joining at your own risk and accept full responsibility for
					your health and safety.
				</p>
			</section>

			{/* SAFETY POLICY */}
			<section id="safety" className="space-y-5">
				<h2 className="text-xl font-semibold">Safety Policy</h2>

				<p className="text-sm leading-relaxed">
					The club prioritizes safety in all sessions and events.
					Members are expected to follow all instructions and safety
					guidelines at all times.
				</p>

				<ul className="text-sm space-y-2 list-disc pl-5">
					<li>Follow coach and session leader instructions.</li>
					<li>
						Warm up and cool down properly before and after runs.
					</li>
					<li>
						Stop immediately if you feel pain, dizziness, or
						discomfort.
					</li>
					<li>
						Wear appropriate running gear and hydration when
						necessary.
					</li>
					<li>
						Be mindful of road safety, traffic, and surroundings.
					</li>
					<li>Do not push beyond your physical limits.</li>
				</ul>

				<p className="text-sm leading-relaxed">
					The club reserves the right to pause or modify sessions due
					to unsafe conditions including weather, environment, or
					participant health.
				</p>
			</section>

			{/* PARTICIPATION TERMS */}
			<section id="terms" className="space-y-5">
				<h2 className="text-xl font-semibold">Participation Terms</h2>

				<p className="text-sm leading-relaxed">
					Membership is based on active participation and community
					engagement. All members are expected to contribute to a
					positive, respectful, and supportive environment.
				</p>

				<ul className="text-sm space-y-2 list-disc pl-5">
					<li>
						Attend at least two sessions before official membership.
					</li>
					<li>Stay reasonably active to maintain member status.</li>
					<li>
						Respect all members regardless of pace or experience
						level.
					</li>
					<li>No harassment, discrimination, or toxic behavior.</li>
					<li>Follow event and training rules.</li>
				</ul>

				<p className="text-sm leading-relaxed">
					The club reserves the right to remove individuals who
					violate community standards, create unsafe conditions, or
					disrupt activities.
				</p>
			</section>

			{/* HEALTH ACKNOWLEDGMENT */}
			<section id="health" className="space-y-5">
				<h2 className="text-xl font-semibold">Health Responsibility</h2>

				<p className="text-sm leading-relaxed">
					You confirm that you are physically capable of participating
					in running activities and have consulted a medical
					professional if necessary before joining.
				</p>

				<p className="text-sm leading-relaxed">
					If you have existing injuries, medical conditions, or
					limitations, you must manage your participation responsibly
					and inform session leaders when needed.
				</p>

				<p className="text-sm leading-relaxed">
					The club is not responsible for monitoring personal health
					conditions or medical readiness.
				</p>
			</section>

			{/* MEDIA CONSENT */}
			<section id="media" className="space-y-5">
				<h2 className="text-xl font-semibold">Media & Photo Consent</h2>

				<p className="text-sm leading-relaxed">
					The club may capture photos and videos during training
					sessions, races, and events for documentation,
					announcements, and community features.
				</p>

				<p className="text-sm leading-relaxed">
					By participating, you grant permission for the club to use
					your image, name, and likeness for:
				</p>

				<ul className="text-sm space-y-2 list-disc pl-5">
					<li>social media posts</li>
					<li>member features</li>
					<li>race highlights</li>
					<li>promotional materials</li>
				</ul>

				<p className="text-sm leading-relaxed">
					This usage is non-commercial and intended only for community
					and organizational purposes.
				</p>
			</section>

			{/* MEMBERSHIP FLOW NOTICE */}
			<section id="membership" className="space-y-5">
				<h2 className="text-xl font-semibold">Membership Process</h2>

				<ul className="text-sm space-y-2 list-disc pl-5">
					<li>Submit the membership application form.</li>
					<li>Join the Facebook group and community chat.</li>
					<li>Attend at least two training sessions.</li>
					<li>Complete waiver and safety acknowledgment.</li>
					<li>Receive official membership approval.</li>
				</ul>

				<p className="text-sm leading-relaxed">
					Official members may receive access to private community
					groups, events, and club merchandise.
				</p>
			</section>

			{/* CONTACT */}
			<section className="space-y-5">
				<h2 className="text-xl font-semibold">Questions</h2>

				<p className="text-sm leading-relaxed">
					If you have questions regarding safety, participation, or
					membership policies, please contact the run club organizers
					before joining any session.
				</p>
			</section>
		</main>
	);
}
