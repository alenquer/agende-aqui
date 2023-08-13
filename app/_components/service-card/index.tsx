"use client";
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
				"h-80",
				"border-[1px]",
				"border-[#eee]",
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
				<p className={twMerge("text-sm", "text-primary", "font-semibold")}>{price}</p>
				<div className={twMerge("w-full", "h-24", "rounded-md", "bg-slate-200")} />
				<div className={twMerge("text-left", "w-full")}>
					<p className={twMerge("text-sm", "font-semibold", "text-primary", "line-clamp-2")}>{title}</p>
					<p className={twMerge("text-[12px]", "text-[#11111199]", "mt-1", "line-clamp-3")}>
						{description || "Sem detalhes..."}
					</p>
				</div>
			</div>
			<button className={twMerge("w-full", "h-9", "bg-primary", "rounded-md", "hover:opacity-50")}>
				<span className={twMerge("text-white", "font-semibold", "text-sm")}>Agendado</span>
			</button>
		</div>
	);
};
