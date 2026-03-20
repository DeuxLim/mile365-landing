import { getImage } from "@/services/cloudinary.service";
import { motion } from "framer-motion";

export default function About() {
	return (
		<section
			id="about"
			data-theme="light"
			className="min-h-screen bg-white text-black flex items-center snap-start px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0"
		>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ amount: 0.3, once: true }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-center"
			>
				{/* LEFT CONTENT */}
				<div className="space-y-6 md:space-y-8">
					<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
						About Mile 365
					</p>

					<h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight max-w-xl">
						Built on consistency.
						<br />
						Driven by community.
					</h2>

					<p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md md:max-w-lg">
						MILE 365 Run Club is a Bulacan-based running community
						built for runners who believe that showing up
						consistently changes everything.
					</p>

					<p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md md:max-w-lg">
						We combine structured training, coaching guidance, and a
						strong social environment — so runners of all levels can
						improve safely, progressively, and confidently.
					</p>

					<p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md md:max-w-lg">
						The 365 mentality is simple: 1% better every day. Small
						progress compounds.
					</p>
				</div>

				{/* RIGHT VISUAL */}
				<div className="flex flex-col gap-4 relative">
					{/* Vertical accent line */}
					<div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-neutral-300 to-transparent" />

					{[
						{
							key: "about1",
							label: "01",
							caption: "2025 Year-end run",
						},
						{
							key: "about2",
							label: "02",
							caption: "Friday Easy Run",
						},
						{
							key: "about3",
							label: "03",
							caption: "Nlex Tabang LSD",
						},
					].map(({ key, label, caption }, i) => (
						<div
							key={key}
							className="group relative pl-6"
							style={{
								marginLeft:
									i === 1
										? "1.5rem"
										: i === 2
											? "0.75rem"
											: "0",
								transition: "transform 0.4s ease",
							}}
						>
							{/* Number label */}
							<span
								className="absolute left-0 top-3 text-[10px] font-mono text-neutral-400 tracking-widest"
								style={{
									writingMode: "vertical-lr",
									transform: "rotate(180deg)",
									lineHeight: 1,
								}}
							>
								{label}
							</span>

							{/* Image card */}
							<div
								className="relative w-full rounded-lg overflow-hidden shadow-md"
								style={{
									height: "clamp(180px, 20vw, 240px)",
									transform: `translateY(${i % 2 === 0 ? "0px" : "8px"})`,
								}}
							>
								<img
									className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									src={getImage(key)}
									alt={caption}
								/>

								{/* Dark overlay on hover */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

								{/* Caption reveal */}
								<div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-linear-to-t from-black/70 to-transparent">
									<p className="text-white text-xs font-medium tracking-widest uppercase">
										{caption}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
