"use client";
import { twMerge } from "tailwind-merge";

export interface IScheduleProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
	title?: string;
	qty: number;
}

export const Schedules: React.FC<IScheduleProps> = ({ title = "Agendamentos", qty = 0, className, ...rest }) => {
	return (
		<button
			className={twMerge(
				"rounded-md",
				"flex",
				"flex-row",
				"items-center",
				"overflow-hidden",
				"hover:opacity-50",
				className
			)}
			{...rest}
		>
			<div className={twMerge("bg-primary", "py-2", "px-4", "h-full")}>
				<p className={twMerge("text-sm", "font-semibold", "text-white")}>{title}</p>
			</div>
			<div className={twMerge("bg-secondary", "py-2", "px-4", "h-full")}>
				<p className={twMerge("text-sm", "font-semibold", "text-white")}>{qty}</p>
			</div>
		</button>
	);
};
