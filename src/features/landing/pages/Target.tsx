import { getImage } from "@/services/cloudinary.service";
import { motion } from "framer-motion";

const levels = [
	"Beginners welcome.",
	"Walk-run friendly.",
	"Intermediate runners.",
	"Performance focused athletes.",
];

export default function Target() {
	return (
		<motion.section
			id="target"
			data-theme="dark"
			className="relative min-h-screen text-white flex items-center snap-start overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ amount: 0.3, once: true }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<div className="absolute inset-0 -z-10">
				<img
					src={getImage("whyjoin-background")}
					className="absolute inset-0 w-full h-full object-cover"
				/>

				{/* Dark overlay */}
				<div className="absolute inset-0 bg-black/85" />
			</div>

			<div className="relative max-w-6xl mx-auto w-full flex flex-col justify-center space-y-12 md:space-y-16">
				{/* Header */}
				<div className="space-y-5 md:space-y-6">
					<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
						Who Can Join
					</p>

					<h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading leading-[1.05] tracking-tight max-w-2xl">
						If you’re willing
						<br />
						to show up —
						<br />
						you belong here.
					</h2>

					<p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
						No membership fee. No ego. Just discipline, consistency,
						and support.
					</p>
				</div>

				{/* Levels */}
				<div className="grid sm:grid-cols-2 gap-6 md:gap-8 text-base sm:text-lg md:text-2xl text-neutral-300">
					{levels.map((level, i) => (
						<motion.div
							key={level}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.3, once: true }}
							transition={{ duration: 0.45, delay: i * 0.12 }}
							className="border-l border-white/20 pl-5 md:pl-6"
						>
							{level}
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
