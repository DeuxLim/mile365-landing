import { HiOutlineMenu } from "react-icons/hi";

type Props = {
	onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: Props) {
	return (
		<header className="md:hidden h-16 border-b border-zinc-200 flex items-center justify-between px-4 bg-white">
			{/* Menu Button */}
			<button
				type="button"
				onClick={onMenuClick}
				className="p-2 rounded-md hover:bg-zinc-100 transition"
			>
				<HiOutlineMenu className="text-2xl" />
			</button>

			{/* Logo / Title */}
			<h1 className="font-heading font-bold text-lg">MILE 365 RUN CLUB</h1>

			{/* Spacer for balance */}
			<div className="w-8" />
		</header>
	);
}
