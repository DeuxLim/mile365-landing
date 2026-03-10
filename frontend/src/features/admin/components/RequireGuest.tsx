import { useAuthenticatedAdmin } from "@/features/admin/hooks/useAuthenticatedAdmin";
import { Navigate, Outlet } from "react-router";

export default function RequireGuest() {
	const { data: admin, isPending } = useAuthenticatedAdmin();

	if (isPending) return null;

	if (admin) {
		return <Navigate to="/admin/dashboard" replace />;
	}

	return <Outlet />;
}
