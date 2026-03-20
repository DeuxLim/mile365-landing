import { useEffect, useRef } from "react";

export default function LandingMusic() {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const start = () => {
			audioRef.current?.play().catch(() => {});
			remove();
		};

		const remove = () => {
			window.removeEventListener("click", start);
			window.removeEventListener("scroll", start);
			window.removeEventListener("keydown", start);
			window.removeEventListener("touchstart", start);
		};

		window.addEventListener("click", start, { once: true });
		window.addEventListener("scroll", start, { once: true });
		window.addEventListener("keydown", start, { once: true });
		window.addEventListener("touchstart", start, { once: true });

		return remove;
	}, []);

	return (
		<audio ref={audioRef} loop preload="auto">
			<source src="/audio/run-theme.mp3" type="audio/mpeg" />
		</audio>
	);
}
