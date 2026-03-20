import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";

const LAST_VISIT_KEY = "lastVisit";
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

function shouldShowLoader(): boolean {
	// never show in development
	if (import.meta.env.DEV) return false;

	const now = Date.now();
	const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

	// update visit timestamp immediately
	localStorage.setItem(LAST_VISIT_KEY, now.toString());

	// first time visiting
	if (!lastVisit) return true;

	const timeAway = now - Number(lastVisit);

	// show again if user hasn't visited for 7 days
	return timeAway > ONE_WEEK;
}

export default function RootLayout() {
	// initialize correctly on first render
	const [appReady, setAppReady] = useState(() => !shouldShowLoader());

	const handleLoaderFinish = () => {
		setAppReady(true);
	};

	if (!appReady) {
		return <PageLoader onFinish={handleLoaderFinish} />;
	}

	return (
		<div className="animate-fadeIn">
			<Suspense fallback={null}>
				<Navbar />
				<Outlet />
				<Footer />
			</Suspense>
		</div>
	);
}
