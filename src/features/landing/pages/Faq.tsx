import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
	{
		question: "Is there a membership fee?",
		answer: "No. MILE 365 is free to join.",
	},
	{
		question: "Do I need to be fast to join?",
		answer: "Not at all. Beginners, walk-run friendly runners, and performance athletes are all welcome.",
	},
	{
		question: "Where are the runs held?",
		answer: "Sessions are held around Bulacan. Final locations are posted weekly inside the group.",
	},
	{
		question: "Do I need to attend every session?",
		answer: "No. But consistency is encouraged for better progress.",
	},
	{
		question: "Can I join if I have an upcoming race?",
		answer: "Yes. Training blocks can adjust to support race preparation.",
	},
	{
		question: "How do I officially join?",
		answer: "Follow our social pages, sign up on the website, attend at least 2 sessions, and you're in.",
	},
];

export default function FAQ() {
	const [active, setActive] = useState<number | null>(null);

	return (
		<motion.section
			id="faq"
			data-theme="dark"
			className="min-h-screen bg-black text-white flex items-center snap-start px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ amount: 0.3, once: true }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto w-full flex flex-col justify-center">
				{/* Header */}
				<div className="mb-12 md:mb-16">
					<p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
						FAQ
					</p>

					<h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight mt-4 md:mt-6 max-w-xl">
						Clear answers.
						<br />
						No confusion.
					</h2>
				</div>

				{/* Questions */}
				<div className="space-y-5 md:space-y-6">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="border-b border-white/20 pb-5 md:pb-6"
						>
							<button
								onClick={() =>
									setActive(active === index ? null : index)
								}
								className="w-full text-left text-base sm:text-lg md:text-xl font-semibold flex justify-between items-center gap-4"
							>
								<span className="leading-snug">
									{faq.question}
								</span>

								<span className="text-neutral-400 text-lg md:text-xl">
									{active === index ? "−" : "+"}
								</span>
							</button>

							{active === index && (
								<motion.p
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.25 }}
									className="mt-3 md:mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl"
								>
									{faq.answer}
								</motion.p>
							)}
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
