"use client";
import { PiMagnifyingGlass } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export interface ISearchBarProps extends React.HTMLProps<HTMLInputElement> {
	containerClass?: string;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ containerClass, className: inputClass, ...rest }) => {
	return (
		<div
			className={twMerge(
				"relative",
				"h-12",
				"overflow-hidden",
				"bg-white",
				"border-[1px]",
				"rounded-md",
				"w-full",
				"flex",
				"flex-row",
				"items-center",
				"justify-start",
				"gap-3",
				containerClass
			)}
		>
			<input
				placeholder="Pesquisar..."
				className={twMerge("pl-11", "pr-4", "text-[#11111166]", "text-sm", "w-full", "h-full", inputClass)}
				{...rest}
			/>
			<div className={twMerge("absolute", "left-3")}>
				<PiMagnifyingGlass size={24} color="#11111166" />
			</div>
		</div>
	);
};
