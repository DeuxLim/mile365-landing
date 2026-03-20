import { useAuthenticatedAdmin } from "@/features/admin/hooks/useAuthenticatedAdmin";
import { Navigate, Outlet } from "react-router";

export default function RequireGuest() {
	const { admin } = useAuthenticatedAdmin();

	// Allow the login page to render immediately; if the user is already
	// authenticated, redirect once `/api/admin/me` resolves.
	if (admin) {
		return <Navigate to="/admin/dashboard" replace />;
	}

	return <Outlet />;
}
