import { Link, NavLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../admin.service";
import { useAuthenticatedAdmin } from "@/features/admin/hooks/useAuthenticatedAdmin";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import adminNav from "../admin-nav";

export default function Sidebar() {
	const navigate = useNavigate();
	const { clearAdmin } = useAuthenticatedAdmin();
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const { mutate: logout, isPending } = useMutation({
		mutationFn: logoutAdmin,
		onSettled: () => {
			clearAdmin();
			navigate("/admin/login", { replace: true });
		},
	});

	return (
		<>
			<aside
				className={`hidden md:flex flex-col border-r border-zinc-200 transition-all duration-300 ${sidebarOpen ? "w-72" : "w-20"}`}
			>
				<nav className="px-4 h-full flex flex-col gap-2 w-full items-center">
					<Link
						to="dashboard"
						className="w-full m-4 flex justify-between items-center"
					>
						{sidebarOpen && (
							<h1 className="font-heading font-bold text-left text-xl text-nowrap">
								MILE 365 RUN CLUB
							</h1>
						)}
						<button
							type="button"
							onClick={() => setSidebarOpen((prev) => !prev)}
							className={!sidebarOpen ? `px-4 py-2` : ""}
						>
							<RiMenu3Fill className="text-lg" />
						</button>
					</Link>

					<div className="w-full flex flex-col gap-8">
						<ul className="w-full flex flex-col gap-2">
							{adminNav.slice(0, 1).map((item) => {
								const Icon = item.icon;

								return (
									<li key={item.path}>
										<NavLink
											to={item.path}
											className={({ isActive }) =>
												`flex items-center gap-2 px-4 py-2 rounded-md transition ${
													isActive
														? "bg-zinc-100 font-normal"
														: "hover:bg-zinc-100"
												}`
											}
										>
											<Icon className="text-xl shrink-0" />
											{sidebarOpen && (
												<div className="text-sm">
													{item.label}
												</div>
											)}
										</NavLink>
									</li>
								);
							})}
						</ul>

						{/* CLUB MANAGEMENT */}
						<ul className="w-full">
							<li className="flex flex-col gap-2">
								{sidebarOpen && (
									<p className="text-xs text-zinc-500 text-nowrap">
										Club Management
									</p>
								)}
								<ul className="flex flex-col gap-2">
									{adminNav.slice(1).map((item) => {
										const Icon = item.icon;

										return (
											<li key={item.path}>
												<NavLink
													to={item.path}
													className={({ isActive }) =>
														`flex items-center gap-2 px-4 py-2 rounded-md transition ${
															isActive
																? "bg-zinc-100 font-normal"
																: "hover:bg-zinc-100"
														}`
													}
												>
													<Icon className="text-xl shrink-0" />
													{sidebarOpen && (
														<div className="text-sm text-nowrap">
															{item.label}
														</div>
													)}
												</NavLink>
											</li>
										);
									})}
								</ul>
							</li>
						</ul>

						{/* ACCOUNT CONTROLS */}
						<ul className="w-full">
							<li className="flex flex-col gap-2">
								{sidebarOpen && (
									<p className="text-xs text-zinc-500">
										Account
									</p>
								)}
								<ul>
									<li>
										<button
											onClick={() => logout()}
											disabled={isPending}
											className="w-full text-sm gap-2 px-4 py-2 flex items-center hover:bg-zinc-100 rounded-md"
										>
											<RiLogoutBoxLine className="text-xl shrink-0" />
											{sidebarOpen &&
												(isPending
													? "Logging out..."
													: "Logout")}
										</button>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</nav>
			</aside>
		</>
	);
}
