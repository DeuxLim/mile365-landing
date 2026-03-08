import { useState, useEffect } from "react";

const stats = [
	{
		label: "Pending Requests",
		value: 12,
		icon: (
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</svg>
		),
		color: "bg-amber-500/10 text-amber-600",
		bar: "bg-amber-500",
		trend: "+2 today",
		progress: "w-3/5",
	},
	{
		label: "Upcoming Runs",
		value: 3,
		icon: (
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
		),
		color: "bg-sky-500/10 text-sky-600",
		bar: "bg-sky-500",
		trend: "Next: Sunday",
		progress: "w-2/5",
	},
	{
		label: "PR Breakers (Week)",
		value: 5,
		icon: (
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
			</svg>
		),
		color: "bg-rose-500/10 text-rose-600",
		bar: "bg-rose-500",
		trend: "↑ 2 vs last week",
		progress: "w-5/6",
	},
	{
		label: "Monthly Distance",
		value: "842",
		unit: "km",
		icon: (
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<polyline points="12 6 12 12 16 14" />
			</svg>
		),
		color: "bg-emerald-500/10 text-emerald-600",
		bar: "bg-emerald-500",
		trend: "↑ 12% vs last month",
		progress: "w-3/4",
	},
];

const activities = [
	{
		user: "Test User 1",
		activity: "Track Speed Session 6×800m",
		time: "1h ago",
		km: "5.2 km",
		live: true,
	},
	{
		user: "Test User 2",
		activity: "Easy Run",
		time: "3h ago",
		km: "6 km",
		live: false,
	},
	{
		user: "Test User 3",
		activity: "Long Slow Distance 21 km",
		time: "5h ago",
		km: "21 km",
		live: false,
	},
	{
		user: "Test User 4",
		activity: "Easy Recovery Run",
		time: "Yesterday",
		km: "5 km",
		live: false,
	},
];

const leaderboard = [
	{ name: "Test User 1", distance: 64 },
	{ name: "Test User 2", distance: 58 },
	{ name: "Test User 3", distance: 51 },
	{ name: "Test User 4", distance: 46 },
];

const announcements = [
	{
		text: "Friday easy run rescheduled to 7:00 PM due to traffic.",
		tag: "Schedule",
		urgent: true,
	},
];

const upcomingRuns = [
	{ name: "Baguio Marathon", date: "Mar 10", time: "4:00 AM", type: "Race" },
	{
		name: "Track / Speed Session",
		date: "Mar 12",
		time: "6:00 AM",
		type: "Speed",
	},
	{ name: "Easy Run", date: "Mar 14", time: "6:00 AM", type: "Easy" },
];

const runTypeBadge = {
	Race: "bg-rose-500/10 text-rose-600",
	Speed: "bg-sky-500/10 text-sky-600",
	Easy: "bg-emerald-500/10 text-emerald-600",
	Long: "bg-amber-500/10 text-amber-600",
};

const medals = ["🥇", "🥈", "🥉"];
const leaderBarWidths = ["w-full", "w-10/12", "w-9/12", "w-8/12"];

export default function AdminDashboardPage() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const t = setInterval(() => setTime(new Date()), 60000);
		return () => clearInterval(t);
	}, []);

	const timeStr = time.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	const dateStr = time.toLocaleDateString([], {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	return (
		<main className="flex flex-col gap-4 h-full">
			{/* Header */}
			<section className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold tracking-tight text-neutral-900">
						Admin Dashboard
					</h1>
					<p className="text-xs text-neutral-500 mt-0.5">
						Overview of club activity and performance
					</p>
				</div>

				<div className="text-right">
					<p className="text-lg font-semibold tracking-tight text-neutral-900">
						{timeStr}
					</p>
					<p className="text-xs text-neutral-400 mt-0.5">{dateStr}</p>
					<div className="flex items-center justify-end gap-1.5 mt-1">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
						<span className="text-xs font-medium text-emerald-600">
							Live
						</span>
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="grid gap-3 md:grid-cols-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="group rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
					>
						<div className="flex items-center justify-between">
							<p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
								{stat.label}
							</p>
							<div
								className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color}`}
							>
								{stat.icon}
							</div>
						</div>

						<div className="mt-2 flex items-baseline gap-1">
							<p className="text-2xl font-semibold tracking-tight text-neutral-900">
								{stat.value}
							</p>
							{stat.unit && (
								<span className="text-sm text-neutral-400 font-medium">
									{stat.unit}
								</span>
							)}
						</div>

						<div className="mt-2 h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
							<div
								className={`h-full rounded-full ${stat.bar} ${stat.progress}`}
							/>
						</div>

						<p className="mt-1.5 text-xs text-neutral-400">
							{stat.trend}
						</p>
					</div>
				))}
			</section>

			{/* Activity + Leaderboard */}
			<section className="grid gap-4 lg:grid-cols-3 flex-1 min-h-0">
				{/* Activity Feed */}
				<div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm flex flex-col min-h-0">
					<div className="flex items-center justify-between mb-3">
						<div>
							<h2 className="text-sm font-semibold text-neutral-900">
								Recent Activity
							</h2>
							<p className="text-xs text-neutral-400 mt-0.5">
								Member training log
							</p>
						</div>
						<div className="flex items-center gap-1.5 bg-emerald-500/10 rounded-full px-3 py-1">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
							<span className="text-xs font-semibold text-emerald-600">
								Live feed
							</span>
						</div>
					</div>

					<div className="divide-y divide-neutral-100 overflow-auto">
						{activities.map((activity, i) => (
							<div
								key={i}
								className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-neutral-50 transition"
							>
								<div
									className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
										activity.live
											? "bg-emerald-500/10 text-emerald-600 ring-2 ring-emerald-400 ring-offset-1"
											: "bg-neutral-100 text-neutral-500"
									}`}
								>
									{activity.user
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<p className="text-sm font-medium text-neutral-900">
											{activity.user}
										</p>
										{activity.live && (
											<span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
												LIVE
											</span>
										)}
									</div>
									<p className="text-xs text-neutral-500 truncate">
										{activity.activity}
									</p>
								</div>

								<div className="text-right shrink-0">
									<p className="text-sm font-semibold text-neutral-900">
										{activity.km}
									</p>
									<p className="text-xs text-neutral-400 mt-0.5">
										{activity.time}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Leaderboard */}
				<div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm flex flex-col min-h-0">
					<div className="mb-3">
						<h2 className="text-sm font-semibold text-neutral-900">
							Weekly Leaderboard
						</h2>
						<p className="text-xs text-neutral-400 mt-0.5">
							Total distance this week
						</p>
					</div>

					<div className="space-y-3 flex-1">
						{leaderboard.map((runner, i) => (
							<div key={i}>
								<div className="flex items-center justify-between text-sm mb-1">
									<div className="flex items-center gap-2">
										<span>{medals[i] ?? "🏃"}</span>
										<span className="font-medium text-neutral-900">
											{runner.name}
										</span>
									</div>
									<div className="flex items-baseline gap-0.5">
										<span className="font-semibold text-neutral-900">
											{runner.distance}
										</span>
										<span className="text-xs text-neutral-400">
											km
										</span>
									</div>
								</div>
								<div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
									<div
										className={`h-full bg-emerald-500 rounded-full ${leaderBarWidths[i]}`}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="mt-3 rounded-xl bg-neutral-50 border border-neutral-100 px-4 py-2.5 text-center">
						<p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
							Club Total
						</p>
						<div className="flex items-baseline justify-center gap-1 mt-0.5">
							<p className="text-xl font-semibold tracking-tight text-neutral-900">
								{leaderboard.reduce(
									(s, r) => s + r.distance,
									0,
								)}
							</p>
							<span className="text-sm text-neutral-400">km</span>
						</div>
					</div>
				</div>
			</section>

			{/* Announcements + Upcoming Runs */}
			<section className="grid gap-4 lg:grid-cols-2">
				{/* Announcements */}
				<div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
					<div className="mb-3">
						<h2 className="text-sm font-semibold text-neutral-900">
							Announcements
						</h2>
						<p className="text-xs text-neutral-400 mt-0.5">
							Latest club notices
						</p>
					</div>

					<div className="space-y-2">
						{announcements.map((a, i) => (
							<div
								key={i}
								className={`rounded-xl border-l-2 border px-3 py-2.5 ${
									a.urgent
										? "bg-amber-50 border-amber-200 border-l-amber-400"
										: "bg-neutral-50 border-neutral-100 border-l-neutral-300"
								}`}
							>
								<div className="flex items-center gap-2 mb-1">
									<span
										className={`text-xs font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
											a.urgent
												? "bg-amber-100 text-amber-700"
												: "bg-neutral-100 text-neutral-500"
										}`}
									>
										{a.tag}
									</span>
									{a.urgent && (
										<span className="text-xs font-medium text-amber-600">
											Urgent
										</span>
									)}
								</div>
								<p className="text-sm text-neutral-700 leading-snug">
									{a.text}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Upcoming Runs */}
				<div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
					<div className="mb-3">
						<h2 className="text-sm font-semibold text-neutral-900">
							Upcoming Runs
						</h2>
						<p className="text-xs text-neutral-400 mt-0.5">
							Scheduled sessions
						</p>
					</div>

					<div className="space-y-2">
						{upcomingRuns.map((run, i) => (
							<div
								key={i}
								className="flex items-center gap-3 rounded-xl border border-neutral-100 px-3 py-2.5 hover:bg-neutral-50 transition"
							>
								<div className="flex flex-col items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 shrink-0">
									<span className="text-[9px] font-bold uppercase tracking-wide text-neutral-400 leading-none">
										{run.date.split(" ")[0]}
									</span>
									<span className="text-sm font-bold text-neutral-900 leading-tight">
										{run.date.split(" ")[1]}
									</span>
								</div>

								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-neutral-900">
										🏃 {run.name}
									</p>
									<p className="text-xs text-neutral-400 mt-0.5">
										{run.time}
									</p>
								</div>

								<span
									className={`text-xs font-semibold px-2 py-1 rounded-md ${runTypeBadge[run.type]}`}
								>
									{run.type}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
