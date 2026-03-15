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
		label: "Membership Requests",
		path: "membership-requests",
		icon: MdOutlineGroupAdd,
	},
	{
		label: "Official Members",
		path: "members",
		icon: MdOutlineGroups3,
	},
];

export default adminNav;
