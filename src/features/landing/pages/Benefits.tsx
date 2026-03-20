import { motion } from "framer-motion";
import Particles from "../../../components/imports/Particles";

const benefits = [
	{
		title: "Structured Weekly Programs",
		desc: "Speed, recovery, and long-distance sessions designed and adjusted by Coach Daniel.",
	},
	{
		title: "Race Preparation Support",
		desc: "Training blocks adapted for upcoming races, with full community support on race day.",
	},
	{
		title: "Injury Prevention Awareness",
		desc: "We train hard — but smart. Recovery and pacing matter.",
	},
	{
		title: "Community & Accountability",
		desc: "Progress is easier when you don’t run alone.",
	},
	{
		title: "Monthly Challenges",
		desc: "Mileage goals, streaks, and friendly competition to stay consistent.",
	},
	{
		title: "Exclusive Member Perks",
		desc: "Future access to club merch, race postcards, and featured media content.",
	},
];

export default function Benefits() {
	return (
		<motion.section
			id="benefits"
			data-theme="dark"
			className="relative min-h-screen bg-black text-white flex items-center snap-start overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ amount: 0.3, once: true }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			{/* PARTICLES BACKGROUND */}
			<div className="absolute inset-0 z-0 opacity-60 md:opacity-100">
				<Particles />
			</div>

			{/* DARK OVERLAY */}
			<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black z-10" />

			{/* CONTENT */}
			<div className="relative z-20 max-w-6xl mx-auto w-full flex flex-col justify-center">
				{/* Header */}
				<div className="mb-12 md:mb-20">
					<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
						Why Join
					</p>

					<h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight mt-4 md:mt-6 max-w-xl">
						More than just
						<br />a weekly run.
					</h2>
				</div>

				{/* Benefits Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-20 gap-y-8 md:gap-y-12">
					{benefits.map((benefit, i) => (
						<motion.div
							key={benefit.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.3, once: true }}
							transition={{ duration: 0.45, delay: i * 0.08 }}
							className="space-y-2 sm:space-y-3 border-l border-white/20 pl-4 sm:pl-6 md:pl-8"
						>
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
								{benefit.title}
							</h3>
							<p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md">
								{benefit.desc}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
