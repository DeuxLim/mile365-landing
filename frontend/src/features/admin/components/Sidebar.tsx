import { Link, NavLink, useNavigate } from "react-router";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../admin.service";
import { useAuthenticatedAdmin } from "@/hooks/useAuthenticatedAdmin";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineGroups3 } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";

export default function Sidebar() {
	const navigate = useNavigate();
	const { clearAdmin } = useAuthenticatedAdmin();

	const { mutate: logout, isPending } = useMutation({
		mutationFn: logoutAdmin,
		onSuccess: () => {
			clearAdmin();
			navigate("/admin/login", { replace: true });
		},
	});

	return (
		<aside className="w-96 hidden md:flex flex-col border-r border-zinc-200">
			<nav className="px-6 py-4 h-full flex flex-col gap-2 w-full items-center">
				<Link to="dashboard" className="w-full m-4">
					<h1 className="font-heading font-bold text-left text-xl">
						MILE 365 RUN CLUB
					</h1>
				</Link>

				<div className="w-full flex flex-col gap-8">
					<ul className="w-full">
						<li className="flex flex-col gap-2">
							<ul className="flex flex-col gap-2">
								<li>
									<NavLink
										to="dashboard"
										className={({ isActive }) =>
											`flex items-center gap-2 px-4 py-2 rounded-md transition ${
												isActive
													? "bg-zinc-100 font-normal"
													: "hover:bg-zinc-100"
											}`
										}
									>
										<MdOutlineDashboard className="text-xl" />
										<div className="text-sm">Dashboard</div>
									</NavLink>
								</li>
							</ul>
						</li>
					</ul>

					{/* CLUB MANAGEMENT */}
					<ul className="w-full">
						<li className="flex flex-col gap-2">
							<p className="text-xs text-zinc-500">
								Club Management
							</p>
							<ul className="flex flex-col gap-2">
								<li>
									<NavLink
										to="membership-requests"
										className={({ isActive }) =>
											`flex items-center gap-2 px-4 py-2 rounded-md transition ${
												isActive
													? "bg-zinc-100 font-normal"
													: "hover:bg-zinc-100"
											}`
										}
									>
										<MdOutlineGroupAdd className="text-xl" />
										<div className="text-sm">Requests</div>
									</NavLink>
								</li>
								<li>
									<NavLink
										to="members"
										className={({ isActive }) =>
											`flex items-center gap-2 px-4 py-2 rounded-md transition ${
												isActive
													? "bg-zinc-100 font-normal"
													: "hover:bg-zinc-100"
											}`
										}
									>
										<MdOutlineGroups3 className="text-xl" />
										<div className="text-sm">Members</div>
									</NavLink>
								</li>
							</ul>
						</li>
					</ul>

					{/* ACCOUNT CONTROLS */}
					<ul className="w-full">
						<li className="flex flex-col gap-2">
							<p className="text-xs text-zinc-500">Account</p>
							<ul>
								<li>
									<button
										onClick={() => logout()}
										disabled={isPending}
										className="w-full text-sm gap-2 px-4 py-2 flex items-center hover:bg-zinc-100"
									>
										<RiLogoutBoxLine className="text-xl" />
										{isPending
											? "Logging out..."
											: "Logout"}
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</aside>
	);
}
