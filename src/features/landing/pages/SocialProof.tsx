import { motion } from "framer-motion";

const testimonials = [
	{
		quote: "I couldn’t even run 1KM before. Now I’m finishing long runs strong.",
		name: "M365 Member",
	},
	{
		quote: "The structure and community changed how I train.",
		name: "M365 Member",
	},
	{
		quote: "Best decision I made this year.",
		name: "M365 Member",
	},
];

export default function SocialProof() {
	return (
		<motion.section
			id="social-proof"
			data-theme="light"
			className="min-h-screen bg-white text-black flex items-center snap-start px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ amount: 0.3, once: true }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto w-full flex flex-col justify-center">
				{/* Header */}
				<div className="mb-12 md:mb-20">
					<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
						Community
					</p>

					<h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight mt-4 md:mt-6 max-w-xl">
						Real runners.
						<br />
						Real progress.
					</h2>
				</div>

				{/* Testimonials */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
					{testimonials.map((item, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.3, once: true }}
							transition={{ duration: 0.45, delay: i * 0.12 }}
							className="space-y-4 md:space-y-6 border-l border-black/20 pl-4 sm:pl-6"
						>
							<p className="text-base sm:text-lg md:text-xl leading-relaxed">
								“{item.quote}”
							</p>
							<p className="text-xs sm:text-sm text-neutral-500">
								— {item.name}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
