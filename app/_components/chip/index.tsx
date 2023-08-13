"use client";
import { twMerge } from "tailwind-merge";

export interface IChipProps extends React.HTMLAttributes<HTMLButtonElement> {
	label: string;
	isActive?: boolean;
}

export const Chip: React.FC<IChipProps> = ({ label, isActive, className, ...rest }) => {
	return (
		<button
			className={twMerge(
				"px-4",
				"py-2",
				"rounded-md",
				"whitespace-nowrap",
				"hover:opacity-50",
				isActive ? "bg-primary" : "bg-slate-200",
				className
			)}
			{...rest}
		>
			<span className={twMerge(isActive ? "text-white" : "text-slate-400", "text-sm")}>{label}</span>
		</button>
	);
};
