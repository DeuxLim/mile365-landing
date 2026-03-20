import { useEffect } from "react";
import { useLocation } from "react-router";

import FloatingMusic from "../../../components/LandingMusic";
import About from "./About";
import Benefits from "./Benefits";
import FAQ from "./Faq";
import FinalCTA from "./FinalCTA";
import Gallery from "./Gallery";
import HeroSection from "./HeroSection";
import Schedule from "./Schedule";
import SocialProof from "./SocialProof";
import Target from "./Target";

export default function LandingPage() {
	const location = useLocation();

	useEffect(() => {
		if (!location.hash) return;

		const container = document.getElementById("scroll-container");
		const el = document.querySelector(location.hash);

		if (container && el) {
			setTimeout(() => {
				el.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 100);
		}
	}, [location]);

	return (
		<div
			className="min-h-screen snap-y snap-mandatory scroll-smooth"
			id="scroll-container"
		>
			<HeroSection />
			<About />
			<Target />
			<Schedule />
			<Gallery />
			<Benefits />
			<SocialProof />
			<FAQ />
			<FinalCTA />
			<FloatingMusic />
		</div>
	);
}
