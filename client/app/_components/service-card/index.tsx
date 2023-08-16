"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export interface IServiceCard extends React.HTMLAttributes<HTMLDivElement> {
	data: {
		id: string;
		name: string;
		description?: string;
		price: string;
		isScheduled?: boolean;
		isClosed?: boolean;
	};
}

export const ServiceCard: React.FC<IServiceCard> = ({ data, className, ...rest }) => {
	return (
		<div
			className={twMerge(
				"h-64",
				"border-[1px]",
				"border-tertiary",
				"bg-white",
				"rounded-md",
				"overflow-hidden",
				"flex",
				"flex-col",
				"justify-between",
				"p-4",
				className
			)}
			{...rest}
		>
			<div className={twMerge("flex", "flex-col", "items-center", "gap-2")}>
				<div className={twMerge("text-left", "w-full")}>
					<p className={twMerge("text-sm", "font-semibold", "text-primary", "line-clamp-2")}>
						{data?.name || "Nome indisponível"}
					</p>
					<p className={twMerge("text-xs", "text-[#11111199]", "mt-1", "line-clamp-4")}>
						{data?.description || "Sem detalhes..."}
					</p>
				</div>
			</div>
			<div className={twMerge("flex", "flex-col", "gap-2")}>
				<Link href={`/services/${data.id}`}>
					<button
						className={twMerge(
							"w-full",
							"h-9",
							"rounded-md",
							"hover:opacity-50",
							data?.isClosed ? "bg-red-400" : "bg-primary"
						)}
					>
						<span className={twMerge("text-white", "font-semibold", "text-xs", "sm:text-sm")}>
							{data.isClosed ? "Indisponível" : data?.isScheduled ? "Agendado" : "Agendar"}
						</span>
					</button>
				</Link>
				<button className={twMerge("w-full", "h-9", "bg-slate-400", "rounded-md", "hover:opacity-50")} disabled>
					<span className={twMerge("font-semibold", "text-white", "text-xs", "sm:text-sm")}>
						{data?.price || "Sem valor"}
					</span>
				</button>
			</div>
		</div>
	);
};
