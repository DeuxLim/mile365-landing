import { motion } from "framer-motion";

export default function FinalCTA() {
	return (
		<motion.section
			id="join"
			data-theme="light"
			className="min-h-screen bg-white text-black flex items-center snap-start px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ amount: 0.3, once: true }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto w-full flex flex-col justify-center text-center">
				<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
					Join Mile 365
				</p>

				<h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight mt-6 md:mt-8">
					Show up.
					<br />
					Stay consistent.
					<br />
					Run with us.
				</h2>

				<p className="text-neutral-600 text-sm sm:text-base md:text-lg mt-6 md:mt-8 leading-relaxed max-w-xl md:max-w-2xl mx-auto">
					If you're ready to train with structure, grow with a
					community, and commit to the 365 mindset — it starts with
					showing up.
				</p>

				{/* CTA buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-10 md:mt-12 w-full sm:w-auto">
					<a
						href="/join"
						className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-xs tracking-widest uppercase bg-black text-white hover:bg-neutral-800 transition-all duration-300 text-center"
					>
						Apply to Join
					</a>

					<a
						href="/#schedule"
						className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-xs tracking-widest uppercase border border-black hover:bg-black hover:text-white transition-all duration-300 text-center"
					>
						View Weekly Schedule
					</a>
				</div>
			</div>
		</motion.section>
	);
}
