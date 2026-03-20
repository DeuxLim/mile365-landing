import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileDrawer from "../components/MobileDrawer";

export default function AdminLayout() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="bg-white min-h-screen flex text-black">
			{/* Desktop Sidebar */}
			<Sidebar />

			<div className="flex flex-col flex-1">
				{/* Mobile Topbar */}
				<Topbar onMenuClick={() => setDrawerOpen(true)} />

				{/* Mobile Drawer */}
				<MobileDrawer
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
				/>

				{/* Page Content */}
				<main className="p-6 md:p-10 flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
