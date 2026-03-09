import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
import { getClubGalleryPhotos } from "../landing.service";

interface CloudinaryPhoto {
	asset_id: string;
	public_id: string;
	secure_url: string;
	width: number;
	height: number;
	display_name: string;
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
	photos,
	initialIndex,
	onClose,
}: {
	photos: CloudinaryPhoto[];
	initialIndex: number;
	onClose: () => void;
}) {
	const [active, setActive] = useState(initialIndex);
	const stripRef = useRef<HTMLDivElement>(null);

	const prev = useCallback(
		() => setActive((i) => (i - 1 + photos.length) % photos.length),
		[photos.length],
	);
	const next = useCallback(
		() => setActive((i) => (i + 1) % photos.length),
		[photos.length],
	);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") prev();
			if (e.key === "ArrowRight") next();
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [prev, next, onClose]);

	useEffect(() => {
		const strip = stripRef.current;
		if (!strip) return;
		const thumb = strip.children[active] as HTMLElement;
		if (thumb) {
			thumb.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}, [active]);

	return (
		<motion.div
			className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
		>
			<button
				onClick={onClose}
				className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase"
			>
				✕ Close
			</button>

			<div className="absolute top-5 left-5 text-white/40 text-xs tracking-[0.2em] uppercase">
				{active + 1} / {photos.length}
			</div>

			<div className="flex-1 flex items-center justify-center relative px-14 py-10 min-h-0">
				<button
					onClick={prev}
					className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
				>
					‹
				</button>

				<AnimatePresence mode="wait">
					<motion.img
						key={active}
						src={photos[active].secure_url}
						alt={photos[active].display_name}
						className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
						initial={{ opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.02 }}
						transition={{ duration: 0.22, ease: "easeOut" }}
					/>
				</AnimatePresence>

				<button
					onClick={next}
					className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
				>
					›
				</button>
			</div>

			<div className="shrink-0 pb-6 px-6 mx-20">
				<div
					ref={stripRef}
					className="flex gap-2 overflow-x-auto justify-start"
					style={{ scrollbarWidth: "none" }}
				>
					{photos.map((photo, i) => (
						<button
							key={photo.asset_id}
							onClick={() => setActive(i)}
							className={`
								shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all duration-200
								${
									i === active
										? "ring-2 ring-white opacity-100 scale-105"
										: "opacity-40 hover:opacity-70 scale-100"
								}
							`}
						>
							<img
								src={photo.secure_url}
								alt={photo.display_name}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						</button>
					))}
				</div>
			</div>
		</motion.div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonGrid() {
	return (
		<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
			{Array.from({ length: 18 }).map((_, i) => (
				<div
					key={i}
					className="rounded-lg bg-neutral-800 animate-pulse aspect-square"
				/>
			))}
		</div>
	);
}

// ─── Gallery Grid ─────────────────────────────────────────────────────────────

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 8 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

const containerVariants: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.04 } },
};

const GRID_LIMIT = 17;

function GalleryGrid({
	photos,
	onPhotoClick,
}: {
	photos: CloudinaryPhoto[];
	onPhotoClick: (index: number) => void;
}) {
	const visible = photos.slice(0, GRID_LIMIT);
	const remaining = photos.length - GRID_LIMIT;

	return (
		<motion.div
			className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
		>
			{visible.map((photo, index) => (
				<motion.button
					key={photo.asset_id}
					variants={itemVariants}
					onClick={() => onPhotoClick(index)}
					className="relative overflow-hidden rounded-lg group aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					<img
						src={photo.secure_url}
						alt={photo.display_name}
						loading="lazy"
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
				</motion.button>
			))}

			{/* "+N more" tile — clicking opens lightbox at photo 13 */}
			{remaining > 0 && (
				<motion.button
					variants={itemVariants}
					onClick={() => onPhotoClick(GRID_LIMIT)}
					className="relative overflow-hidden rounded-lg group aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					{/* Blurred preview of the next photo behind the overlay */}
					<img
						src={photos[GRID_LIMIT].secure_url}
						alt="more photos"
						className="w-full h-full object-cover scale-110 blur-sm"
					/>
					<div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1">
						<span className="text-white text-lg font-semibold">
							+{remaining}
						</span>
						<span className="text-white/60 text-[10px] uppercase tracking-widest">
							more
						</span>
					</div>
				</motion.button>
			)}
		</motion.div>
	);
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Gallery() {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const { data, isLoading } = useQuery<CloudinaryPhoto[]>({
		queryKey: ["landing", "gallery"],
		queryFn: getClubGalleryPhotos,
		staleTime: 1000 * 60 * 10,
	});

	useEffect(() => {
		document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [lightboxIndex]);

	return (
		<>
			<motion.section
				id="gallery"
				data-theme="dark"
				className="
					min-h-screen bg-black text-white
					flex flex-col justify-center
					px-5 sm:px-8 md:px-16 lg:px-24
					py-16 md:py-20 lg:py-24
				"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ amount: 0.2, once: true }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			>
				<div className="max-w-6xl mx-auto w-full flex flex-col gap-8 md:gap-10">
					{/* Header */}
					<div>
						<p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-neutral-500">
							In Motion
						</p>
						<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight mt-3">
							MILE 365 Community
						</h2>
					</div>

					{/* Grid */}
					{isLoading || !data ? (
						<SkeletonGrid />
					) : (
						<GalleryGrid
							photos={data}
							onPhotoClick={setLightboxIndex}
						/>
					)}

					{/* Footer hint */}
					{data && data.length > 0 && (
						<p className="text-neutral-600 text-xs tracking-[0.2em] uppercase text-center">
							{data.length} photos · click any to view
						</p>
					)}
				</div>
			</motion.section>

			<AnimatePresence>
				{lightboxIndex !== null && data && (
					<Lightbox
						photos={data}
						initialIndex={lightboxIndex}
						onClose={() => setLightboxIndex(null)}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
