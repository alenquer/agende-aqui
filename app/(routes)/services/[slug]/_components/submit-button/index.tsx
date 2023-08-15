"use client";
import { twMerge } from "tailwind-merge";

export const SubmitButton: React.FC = () => {
	return (
		<button className={twMerge("py-2", "px-6", "bg-primary", "w-max", "rounded-md", "hover:opacity-50")}>
			<span className={twMerge("font-semibold", "text-white", "text-sm")}>Agendar</span>
		</button>
	);
};
