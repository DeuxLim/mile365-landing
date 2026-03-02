import { Navigate, Outlet } from "react-router";
import { useAdmin } from "@/hooks/useAuthenticatedAdmin";

export default function RequireAuth() {
	const { admin, isPending } = useAdmin();

	if (isPending) return null;

	if (!admin) {
		return <Navigate to="/admin/login" replace />;
	}

	return <Outlet />;
}
