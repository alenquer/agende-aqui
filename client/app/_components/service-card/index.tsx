"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export interface IServiceCard extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	description?: string;
	price: string;
}

export const ServiceCard: React.FC<IServiceCard> = ({ title, description = "", price, className, ...rest }) => {
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
					<p className={twMerge("text-sm", "font-semibold", "text-primary", "line-clamp-2")}>{title}</p>
					<p className={twMerge("text-xs", "text-[#11111199]", "mt-1", "line-clamp-4")}>
						{description || "Sem detalhes..."}
					</p>
				</div>
			</div>
			<div className={twMerge("flex", "flex-col", "gap-2")}>
				<Link href={`/services/${title}`}>
					<button className={twMerge("w-full", "h-9", "bg-primary", "rounded-md", "hover:opacity-50")}>
						<span className={twMerge("text-white", "font-semibold", "text-xs", "sm:text-sm")}>Agendado</span>
					</button>
				</Link>
				<button className={twMerge("w-full", "h-9", "bg-primary", "rounded-md", "hover:opacity-50")} disabled>
					<span className={twMerge("font-semibold", "text-white", "text-xs", "sm:text-sm")}>{price}</span>
				</button>
			</div>
		</div>
	);
};
