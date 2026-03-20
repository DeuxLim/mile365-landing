import { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function FloatingMusic() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [playing, setPlaying] = useState(() => {
		return localStorage.getItem("music-playing") === "true";
	});
	const [unlocked, setUnlocked] = useState(false);

	// unlock audio on first user interaction
	useEffect(() => {
		const unlock = async () => {
			if (!audioRef.current) return;

			try {
				// play muted first (allowed)
				audioRef.current.muted = true;
				await audioRef.current.play();
				audioRef.current.pause();
				setUnlocked(true);
			} catch (err) {
				console.log(err);
			}

			window.removeEventListener("click", unlock);
		};

		window.addEventListener("click", unlock);
		return () => window.removeEventListener("click", unlock);
	}, []);

	// play after unlock if preference was ON
	useEffect(() => {
		if (!unlocked || !playing || !audioRef.current) return;

		audioRef.current.muted = false;
		audioRef.current.play();
	}, [unlocked, playing]);

	const toggleMusic = async () => {
		if (!audioRef.current) return;

		try {
			if (playing) {
				audioRef.current.pause();
				localStorage.setItem("music-playing", "false");
			} else {
				audioRef.current.muted = false;
				await audioRef.current.play();
				localStorage.setItem("music-playing", "true");
			}

			setPlaying(!playing);
		} catch (err) {
			console.error("Audio blocked:", err);
		}
	};

	return (
		<>
			{/* background music */}
			<audio ref={audioRef} loop preload="auto">
				<source src="/music/landing.mp3" type="audio/mpeg" />
			</audio>

			{/* floating control */}
			<button
				onClick={toggleMusic}
				className="
                fixed left-4 bottom-6 z-50
                size-8 rounded-full
                bg-black text-white
                flex items-center justify-center
                shadow-lg
                hover:scale-110
                transition-all duration-300
                "
			>
				{playing ? (
					<FaVolumeUp size={12} />
				) : (
					<FaVolumeMute size={12} />
				)}
			</button>
		</>
	);
}
