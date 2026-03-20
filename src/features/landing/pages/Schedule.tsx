import { motion } from "framer-motion";

const sessions = [
	{
		day: "Wednesday",
		type: "Speed Session",
		desc: "Intervals and pacing work designed to improve speed, efficiency, and race performance.",
	},
	{
		day: "Friday",
		type: "Easy Run + Community",
		desc: "Recovery-focused session followed by hangouts and bonding at Malolos Convention.",
	},
	{
		day: "Sunday",
		type: "Long Slow Distance",
		desc: "Endurance-building runs to develop aerobic strength and prepare for races.",
	},
];

export default function Schedule() {
	return (
		<motion.section
			id="schedule"
			data-theme="light"
			className="
				min-h-screen bg-white text-black
				flex flex-col justify-center lg:justify-start
				px-5 sm:px-8 md:px-16 lg:px-24
				py-16 md:py-20 lg:py-28 xl:py-32
			"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ amount: 0.3, once: true }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto w-full flex flex-col">
				{/* Header */}
				<div className="mb-12 md:mb-20">
					<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
						Weekly Training
					</p>

					<h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight mt-4 md:mt-6 max-w-xl">
						A structured rhythm.
						<br />
						Every week.
					</h2>
				</div>

				{/* Timeline */}
				<div className="space-y-10 md:space-y-16">
					{sessions.map((session, i) => (
						<motion.div
							key={session.day}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.3, once: true }}
							transition={{ duration: 0.45, delay: i * 0.12 }}
							className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-4 sm:gap-6 md:gap-12"
						>
							{/* Day */}
							<div className="flex sm:block items-center gap-3">
								<p className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
									{session.day}
								</p>
								<div className="h-px flex-1 bg-black/20 sm:hidden" />
							</div>

							{/* Content */}
							<div className="space-y-2 sm:space-y-3 border-l border-black/20 pl-4 sm:pl-6 md:pl-8">
								<h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
									{session.type}
								</h3>
								<p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md md:max-w-xl">
									{session.desc}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* Footer */}
				<div className="mt-12 md:mt-20 text-neutral-500 text-[11px] sm:text-xs md:text-sm max-w-lg">
					Sessions are held around Bulacan. Final times and locations
					are announced weekly inside the group.
				</div>
			</div>
		</motion.section>
	);
}
