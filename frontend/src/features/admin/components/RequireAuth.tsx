import { Navigate, Outlet } from "react-router";
import { useAuthenticatedAdmin } from "@/hooks/useAuthenticatedAdmin";

export default function RequireAuth() {
	const { admin, isPending } = useAuthenticatedAdmin();

	if (isPending) return null;

	if (!admin) {
		return <Navigate to="/admin/login" replace />;
	}

	return <Outlet />;
}
