import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import lightLogo from "../assets/photos/365_logo_light.png";
import darkLogo from "../assets/photos/365_logo_dark.png";
import { TbMenu, TbX } from "react-icons/tb";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
	const location = useLocation();
	const isJoinPage = location.pathname === "/join";

	const [showNav, setShowNav] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isLightSection, setIsLightSection] = useState(false);

	const lastScrollY = useRef(0);

	/* =========================
	   SCROLL SHOW/HIDE NAV
	========================= */
	useEffect(() => {
		const handleScroll = () => {
			const current = window.scrollY;

			if (current > lastScrollY.current && current > 80) {
				setShowNav(false);
			} else {
				setShowNav(true);
			}

			lastScrollY.current = current;
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	/* =========================
	   REVEAL WHEN CURSOR NEAR TOP
	========================= */
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (e.clientY <= 80) setShowNav(true);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	/* =========================
	   GLOBAL THEME DETECTION
	   Works for landing AND inner pages
	   Requires data-theme on page roots
	========================= */
	useEffect(() => {
		const sections = document.querySelectorAll("[data-theme]");
		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const theme = entry.target.getAttribute("data-theme");
						setIsLightSection(theme === "light");
					}
				});
			},
			{
				root: null,
				threshold: 0,
				rootMargin: "-1px 0px -99% 0px",
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, [location.pathname]);

	/* =========================
	   LOCK BODY SCROLL (Mobile Menu)
	========================= */
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
	}, [menuOpen]);

	/* =========================
	   COLOR + LOGO LOGIC
	========================= */
	const textColor = isLightSection ? "text-black" : "text-white";

	const buttonStyle = isLightSection
		? "border-black hover:bg-black hover:text-white"
		: "border-white hover:bg-white hover:text-black";

	const logoSrc = isLightSection ? darkLogo : lightLogo;

	return (
		<>
			<nav
				className={`
				fixed top-0 left-0 right-0 z-50
				transition-all duration-500 ease-in-out
				${showNav ? "translate-y-0" : "-translate-y-full"}
				${textColor}
			`}
			>
				<div className="flex items-center px-8 h-16">
					{/* LEFT LINKS */}
					<div className="hidden md:flex">
						<ul className="flex gap-6 text-xs uppercase tracking-widest font-semibold">
							<li>
								<a href="/#about">About</a>
							</li>
							<li>
								<a href="/#schedule">Schedule</a>
							</li>
							<li>
								<a href="/#benefits">Why Join</a>
							</li>
							<li>
								<a href="/#faq">FAQ</a>
							</li>
						</ul>
					</div>

					{/* CENTER LOGO */}
					<a className="absolute left-1/2 -translate-x-1/2" href="/">
						<img
							src={logoSrc}
							className="h-10 md:h-12 object-contain transition-all duration-300"
							alt="Mile 365 Logo"
						/>
					</a>

					{/* RIGHT SIDE */}
					<div className="ml-auto hidden md:flex items-center gap-8">
						<ul className="flex gap-6 text-xs uppercase tracking-widest font-semibold">
							<li>
								<a href="/admin/dashboard">Admin Portal</a>
							</li>
							<li>
								<a href="/#gallery">Club Gallery</a>
							</li>
						</ul>

						{!isJoinPage && (
							<a
								href="/join"
								className={`
								px-5 py-2 text-xs uppercase tracking-widest border transition-all duration-300
								${buttonStyle}
								`}
							>
								Join
							</a>
						)}
					</div>

					{/* MOBILE ICON */}
					<div
						className="ml-auto md:hidden relative z-50"
						onClick={() => setMenuOpen((prev) => !prev)}
					>
						{menuOpen ? <TbX size={26} /> : <TbMenu size={26} />}
					</div>
				</div>
			</nav>

			<MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	);
}
