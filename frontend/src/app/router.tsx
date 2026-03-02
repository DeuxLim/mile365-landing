// routes/router.jsx
import { createBrowserRouter, Outlet } from "react-router";
import { lazy } from "react";
import RootLayout from "../layouts/RootLayout";
import { ROUTES } from "./paths.tsx";
import WaiverAndTermsPage from "../pages/waiver-and-terms.tsx";
import JoinSuccess from "@/features/membership/pages/JoinSuccess.tsx";

import AdminLoginPage from "@/features/admin/pages/AdminLoginPage.tsx";
import RequireAuth from "@/features/admin/components/RequireAuth";
import RequireGuest from "@/features/admin/components/RequireGuest";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage.tsx";
import AdminLayout from "@/features/admin/layouts/AdminLayout.tsx";
import MembershipRequestsPage from "@/features/admin/pages/MembershipRequestsPage.tsx";

const LandingPage = lazy(() => import("../features/landing/pages/LandingPage"));

const JoinPage = lazy(
	() => import("../features/membership/pages/JoinPage.tsx"),
);

export const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: ROUTES.JOIN,
				element: <JoinPage />,
			},
			{
				path: ROUTES.WAIVERTERMS,
				element: <WaiverAndTermsPage />,
			},
			{
				path: ROUTES.JOINSUCCESS,
				element: <JoinSuccess />,
			},
		],
	},
	{
		path: "/admin",
		element: <Outlet />,
		children: [
			{
				element: <RequireGuest />,
				children: [
					{
						index: true,
						element: <AdminLoginPage />,
					},
					{
						path: "login",
						element: <AdminLoginPage />,
					},
				],
			},
			{
				element: <RequireAuth />,
				children: [
					{
						element: <AdminLayout />,
						children: [
							{
								path: "dashboard",
								element: <AdminDashboardPage />,
							},
							{
								path: "membership-requests",
								element: <MembershipRequestsPage />,
							},
						],
					},
				],
			},
		],
	},
]);
