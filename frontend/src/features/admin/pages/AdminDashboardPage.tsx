import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../admin.service";
import { FaRegAddressCard } from "react-icons/fa";
import { Link } from "react-router";

const StatsWidget = ({
	label,
	value,
}: {
	label: string;
	value: { total: number; change: number };
}) => {
	return (
		<Link
			to="/admin/membership-requests"
			className="flex flex-col items-start justify-between h-full"
		>
			<div className="flex gap-2 items-center">
				<div className="bg-zinc-100 p-1 rounded-md">
					<FaRegAddressCard className="text-xl text-green-600" />
				</div>
				<div>{label}</div>
			</div>
			<div className="flex w-full justify-center items-end gap-4">
				<div className="text-8xl font-semibold">{value.total}</div>
				<div
					className={`text-xs text-green-600 bg-green-100 py-1 px-2 rounded-lg flex flex-col`}
				>
					<span>
						{value.change > 0 ? "+" + value.change : value.change}%
					</span>
				</div>
			</div>
		</Link>
	);
};

export default function AdminDashboardPage() {
	const { data } = useQuery({
		queryKey: ["dashboard", "stats"],
		queryFn: getDashboardStats,
		staleTime: 1000 * 60 * 60,
	});

	const stats:
		| { [key: string]: { total: number; change: number } }
		| undefined = data?.stats;

	return (
		<main className="flex flex-col gap-4 h-full">
			{/* Header */}
			<section className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold tracking-tight text-neutral-900">
						Admin Dashboard
					</h1>
					<p className="text-xs text-neutral-500 mt-0.5">
						Overview of club activity and performance
					</p>
				</div>
			</section>

			<div className="w-full h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-[1fr_2fr_1fr] gap-4">
				{Object.entries(stats ?? {}).map(
					(
						[key, value]: [
							string,
							{ total: number; change: number },
						],
						index,
					) => {
						return (
							<div
								key={index}
								className="col-span-4 md:col-span-8 lg:col-span-4 xl:col-span-3 rounded-md shadow-sm p-4 hover:shadow-lg transition duration-200 ease-in-out border border-zinc-300"
							>
								<StatsWidget label={key} value={value} />
							</div>
						);
					},
				)}
			</div>
		</main>
	);
}
