import { Navigate, Outlet } from "react-router";
import { useAuthenticatedAdmin } from "@/features/admin/hooks/useAuthenticatedAdmin";

export default function RequireAuth() {
	const { admin, isAuthenticating } = useAuthenticatedAdmin();

	if (isAuthenticating) {
		return (
			<div className="min-h-screen flex items-center justify-center text-sm text-neutral-500">
				Loading…
			</div>
		);
	}

	if (!admin) {
		return <Navigate to="/admin/login" replace />;
	}

	return <Outlet />;
}
