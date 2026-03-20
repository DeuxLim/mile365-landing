import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { TbX } from "react-icons/tb";

type MobileMenuProps = {
	open: boolean;
	onClose: () => void;
};

const links = [
	{ label: "Home", id: "home" },
	{ label: "About", id: "about" },
	{ label: "Schedule", id: "schedule" },
	{ label: "Why Join", id: "benefits" },
	{ label: "FAQ", id: "faq" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
	const navigate = useNavigate();

	// iOS-safe scroll lock
	useEffect(() => {
		if (!open) return;

		const scrollY = window.scrollY;
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";

		return () => {
			const y = document.body.style.top;
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			window.scrollTo(0, parseInt(y || "0") * -1);
		};
	}, [open]);

	// Escape key support
	useEffect(() => {
		if (!open) return;

		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, onClose]);

	const goToSection = (id: string) => {
		onClose();

		// navigate to homepage with hash
		navigate(`/#${id}`);
	};

	return createPortal(
		<div
			className={`
				fixed inset-0 z-100
				bg-black text-white
				transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
				${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}
			`}
		>
			{/* Close Button */}
			<button
				onClick={onClose}
				className="absolute top-6 right-6 pt-safe pr-safe"
				aria-label="Close menu"
			>
				<TbX size={28} />
			</button>

			{/* Menu Content */}
			<div className="flex flex-col h-full justify-center items-center space-y-10">
				{links.map((item, i) => (
					<button
						key={item.label}
						onClick={() => goToSection(item.id)}
						className={`
							text-2xl uppercase tracking-widest font-semibold
							transition-all duration-300
							${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
						`}
						style={{ transitionDelay: `${i * 80}ms` }}
					>
						{item.label}
					</button>
				))}

				<div className="w-12 h-px bg-white/20 my-4" />

				<div className="flex flex-col gap-4">
					<Link
						to="/admin/login"
						className={`
						px-8 py-3 text-xs uppercase tracking-widest
						border-white
						hover:bg-white hover:text-black
						transition-all duration-200
						${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
						`}
						style={{ transitionDelay: `${links.length * 20}ms` }}
					>
						Admin Portal
					</Link>

					<button
						onClick={() => goToSection("join")}
						className={`
						px-8 py-3 text-xs uppercase tracking-widest
						border border-white
						hover:bg-white hover:text-black
						transition-all duration-300
						${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
						`}
						style={{ transitionDelay: `${links.length * 20}ms` }}
					>
						Join Mile 365
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
}
