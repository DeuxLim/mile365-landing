import { motion } from "framer-motion";

export default function Footer() {
	return (
		<motion.footer
			className="bg-black text-white px-6 md:px-24 py-20 snap-start"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
		>
			<div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-12">
				{/* Club Name */}
				<div className="space-y-4">
					<h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
						MILE 365 RUN CLUB
					</h3>

					<p className="text-neutral-400 text-sm uppercase tracking-[0.3em]">
						Bulacan, Philippines
					</p>
				</div>

				{/* Social Links */}
				<div className="flex gap-10 text-sm uppercase tracking-widest">
					<a
						href="https://www.facebook.com/profile.php?id=61574880081979"
						target="_blank"
						className="hover:text-neutral-400 transition"
					>
						Facebook
					</a>
					<a
						href="https://www.instagram.com/mile365runclub/"
						target="_blank"
						className="hover:text-neutral-400 transition"
					>
						Instagram
					</a>
					<a
						href="https://www.tiktok.com/@mile365runclub"
						target="_blank"
						className="hover:text-neutral-400 transition"
					>
						Tiktok
					</a>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-white/10" />

				{/* Bottom Note */}
				<div className="space-y-2 text-neutral-500 text-xs uppercase tracking-wider">
					<p>#Mile365</p>
					<p>Run every day. Grow stronger together.</p>
					<p>© {new Date().getFullYear()} Mile 365 Run Club</p>
				</div>
			</div>
		</motion.footer>
	);
}
