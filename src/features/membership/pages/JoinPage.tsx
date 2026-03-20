import JoinForm from "../components/JoinForm";

export default function JoinPage() {
	return (
		<section
			data-theme="light"
			className="min-h-screen bg-white text-black px-6 md:px-24 pt-24 pb-20"
		>
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col gap-10 mb-10">
					<h1 className="text-4xl md:text-6xl text-center font-heading">
						JOIN TEAM 365
					</h1>

					<p className="text-justify max-w-4xl mx-auto text-muted-foreground leading-relaxed">
						Complete this form to apply for membership. By
						submitting, you agree to all{" "}
						<strong className="text-foreground">
							team agreements and waivers
						</strong>
						. This application grants a{" "}
						<strong className="text-foreground">
							trial membership
						</strong>
						. To become an{" "}
						<strong className="text-foreground">
							official member
						</strong>
						, applicants must{" "}
						<strong className="text-foreground">
							attend at least 2 team sessions
						</strong>
						.
					</p>
				</div>

				<JoinForm />
			</div>
		</section>
	);
}
