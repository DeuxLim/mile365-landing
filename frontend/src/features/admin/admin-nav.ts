import { MdOutlineGroups3 } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineGroupAdd } from "react-icons/md";

const adminNav = [
	{
		label: "Dashboard",
		path: "dashboard",
		icon: MdOutlineDashboard,
	},
	{
		label: "Requests",
		path: "membership-requests",
		icon: MdOutlineGroupAdd,
	},
	{
		label: "Members",
		path: "members",
		icon: MdOutlineGroups3,
	},
];

export default adminNav;
