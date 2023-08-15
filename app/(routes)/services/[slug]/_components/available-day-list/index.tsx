"use client";
import { twMerge } from "tailwind-merge";
import { Chip } from "~/_components/chip";

export interface IDayListProps {
	data: any[];
}

export const AvailableDayList: React.FC<IDayListProps> = ({ data }) => {
	const activeDay = "0";

	return (
		<ul className={twMerge("flex", "flex-row", "items-center", "gap-2", "flex-wrap")}>
			{data.map((_, i) => {
				return (
					<li key={i.toString()}>
						<Chip label="Segunda" isActive={i.toString() === activeDay} />
					</li>
				);
			})}
		</ul>
	);
};
