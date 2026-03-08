export default function AdminDashboardPage() {
	const stats = [
		{ label: "Pending Requests", value: 12 },
		{ label: "Upcoming Runs", value: 3 },
		{ label: "PR Breakers (Week)", value: 5 },
		{ label: "Monthly Distance", value: "842 km" },
	];

	const activities = [
		{ user: "Alex Rivera", activity: "10 km Morning Run", time: "1h ago" },
		{
			user: "Sarah Chen",
			activity: "Interval Training 6x800m",
			time: "3h ago",
		},
		{ user: "Marco Diaz", activity: "Easy Recovery 5 km", time: "5h ago" },
		{ user: "Liam Santos", activity: "Long Run 18 km", time: "Yesterday" },
	];

	const leaderboard = [
		{ name: "Alex Rivera", distance: "64 km" },
		{ name: "Sarah Chen", distance: "58 km" },
		{ name: "Marco Diaz", distance: "51 km" },
		{ name: "Liam Santos", distance: "46 km" },
	];

	const announcements = [
		"Sunday Long Run moved to 5:30 AM due to heat.",
		"Club singlet orders closing this Friday.",
	];

	const upcomingRuns = [
		{ name: "Sunday Long Run", date: "Mar 10 • 5:30 AM" },
		{ name: "Track Intervals", date: "Mar 12 • 6:00 PM" },
		{ name: "Tempo Thursday", date: "Mar 14 • 6:00 PM" },
	];

	return (
		<main className="space-y-8">
			{/* Stats */}
			<section className="grid gap-4 md:grid-cols-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
					>
						<div className="flex items-center justify-between">
							<p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
								{stat.label}
							</p>
							<div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-sm">
								🏃
							</div>
						</div>

						<p className="mt-4 text-3xl font-semibold tracking-tight">
							{stat.value}
						</p>

						<p className="mt-1 text-xs text-neutral-400">
							Updated just now
						</p>
					</div>
				))}
			</section>

			{/* Activity + Leaderboard */}
			<section className="grid gap-6 lg:grid-cols-3">
				{/* Strava Activity */}
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm border-l-4 border-l-emerald-500">
					<h2 className="text-sm font-medium text-neutral-500 mb-4">
						Recent Member Activities
					</h2>

					<div className="divide-y">
						{activities.map((activity, i) => (
							<div
								key={i}
								className="flex items-center gap-4 py-4"
							>
								<div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">
									{activity.user
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</div>

								<div className="flex-1">
									<p className="text-sm font-medium text-neutral-900">
										{activity.user}
									</p>
									<p className="text-sm text-neutral-500">
										{activity.activity}
									</p>
									<p className="text-xs text-neutral-400 mt-1">
										{activity.time}
									</p>
								</div>

								<div className="text-sm font-semibold text-neutral-700">
									🏃
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Leaderboard */}
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
					<h2 className="text-sm font-medium text-neutral-500 mb-4">
						Weekly Leaderboard
					</h2>

					<div className="space-y-3">
						{leaderboard.map((runner, i) => (
							<div
								key={i}
								className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-neutral-50 transition"
							>
								<div className="flex items-center gap-3 text-sm">
									<span className="text-base drop-shadow-sm">
										{i === 0
											? "🥇"
											: i === 1
												? "🥈"
												: i === 2
													? "🥉"
													: "🏃"}
									</span>
									<span className="font-medium text-neutral-900">
										{runner.name}
									</span>
								</div>

								<span className="text-sm font-semibold text-neutral-700">
									{runner.distance}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Announcements + Upcoming Runs */}
			<section className="grid gap-6 lg:grid-cols-2">
				{/* Announcements */}
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
					<h2 className="text-sm font-medium text-neutral-500 mb-4">
						Announcements
					</h2>

					<div className="space-y-3">
						{announcements.map((announcement, i) => (
							<p
								key={i}
								className="text-sm text-neutral-700 leading-relaxed"
							>
								<span className="text-neutral-700">
									{announcement}
								</span>
							</p>
						))}
					</div>
				</div>

				{/* Upcoming Runs */}
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
					<h2 className="text-sm font-medium text-neutral-500 mb-4">
						Upcoming Runs
					</h2>

					<div className="space-y-3">
						{upcomingRuns.map((run, i) => (
							<div
								key={i}
								className="flex items-center justify-between text-sm"
							>
								<span className="font-medium">{run.name}</span>
								<span className="text-neutral-500">
									{run.date}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
