import { NavLink, useNavigate } from "react-router";
import adminNav from "../admin-nav";
import { useAuthenticatedAdmin } from "../hooks/useAuthenticatedAdmin";
import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../admin.service";
import { RiLogoutBoxLine } from "react-icons/ri";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function MobileDrawer({ open, onClose }: Props) {
	const navigate = useNavigate();
	const { clearAdmin } = useAuthenticatedAdmin();

	const { mutate: logout, isPending } = useMutation({
		mutationFn: logoutAdmin,
		onSettled: () => {
			clearAdmin();
			navigate("/admin/login", { replace: true });
		},
	});

	return (
		<>
			{/* Overlay */}
			<div
				onClick={onClose}
				className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
					open ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			/>

			{/* Drawer */}
			<aside
				className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden
				${open ? "translate-x-0" : "-translate-x-full"}`}
			>
				<div className="p-6 border-b border-zinc-200">
					<h1 className="font-heading font-bold text-lg">MILE 365</h1>
				</div>

				<nav className="p-4 flex flex-col gap-2">
					{adminNav.map((item) => {
						const Icon = item.icon;

						return (
							<NavLink
								key={item.path}
								to={item.path}
								onClick={onClose}
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-2 rounded-md transition ${
										isActive
											? "bg-zinc-100 font-medium"
											: "hover:bg-zinc-100"
									}`
								}
							>
								<Icon className="text-xl shrink-0" />
								<span className="text-sm">{item.label}</span>
							</NavLink>
						);
					})}

					<button
						onClick={() => logout()}
						disabled={isPending}
						className="flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-zinc-100"
					>
						<RiLogoutBoxLine className="text-xl shrink-0" />
						<span className="text-sm">
							{open && (isPending ? "Logging out..." : "Logout")}
						</span>
					</button>
				</nav>
			</aside>
		</>
	);
}
