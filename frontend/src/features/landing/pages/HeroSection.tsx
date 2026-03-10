import { useEffect, useRef, useState } from "react";
import DecryptedText from "../../../components/imports/DecryptedText";
import { getImage, getVideo } from "@/services/cloudinary.service";

export default function HeroSection() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [progress, setProgress] = useState<number>(0);
	const [barVisible, setBarVisible] = useState(false);
	const [videoReady, setVideoReady] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setBarVisible(true), 400);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleTimeUpdate = () => {
			if (!video.duration) return;
			const percent = (video.currentTime / video.duration) * 100;
			setProgress(percent);
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		return () => video.removeEventListener("timeupdate", handleTimeUpdate);
	}, []);

	return (
		<section
			id="home"
			data-theme="dark"
			className="relative min-h-screen overflow-hidden snap-start"
		>
			{/* Fallback Image while video loads */}
			{!videoReady && (
				<img
					src={getImage("hero_image")}
					alt="Run club hero"
					className="absolute inset-0 w-full h-full object-cover"
				/>
			)}

			{/* Background Video */}
			<video
				ref={videoRef}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				poster={getImage("hero_image")}
				onCanPlay={() => setVideoReady(true)}
				className="absolute inset-0 w-full h-full object-cover md:scale-125 scale-125"
			>
				<source src={getVideo("hero_video")} type="video/mp4" />
			</video>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/70" />

			{/* Content */}
			<div className="relative z-10 flex items-center min-h-screen px-5 sm:px-8 md:px-16 lg:px-24">
				<div className="max-w-6xl mx-auto w-full text-white flex flex-col items-center text-center">
					<h1 className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-heading uppercase font-black tracking-tight leading-[1.05]">
						<DecryptedText
							text="MILE 365 RUN CLUB"
							animateOn="view"
							revealDirection="start"
							sequential
							useOriginalCharsOnly={false}
						/>
					</h1>

					<p className="mt-6 sm:mt-7 md:mt-8 max-w-md md:max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
						More than a run club — it's a commitment. Show up, stay
						consistent, and move forward with a community that
						trains hard and grows together.
					</p>

					{/* CTA */}
					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 md:mt-12 w-full sm:w-auto">
						<a
							href="/#join"
							className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-[11px] md:text-xs tracking-widest uppercase border border-white/30 bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300 text-center"
						>
							Run With Us
						</a>

						<a
							href="#schedule"
							className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-[11px] md:text-xs tracking-widest uppercase border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-center"
						>
							View Schedule
						</a>
					</div>
				</div>
			</div>

			{/* Progress Bar */}
			<div
				className={`
					pointer-events-none absolute bottom-6 md:bottom-10 left-5 right-5 md:left-24 md:right-24 z-20
					transform transition-all duration-700 ease-out
					${barVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
				`}
			>
				<div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
					<div
						className="h-full bg-white transition-[width] duration-700 ease-linear"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
		</section>
	);
}
