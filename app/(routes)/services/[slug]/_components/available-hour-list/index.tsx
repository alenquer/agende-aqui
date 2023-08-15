"use client";
import { twMerge } from "tailwind-merge";
import { Chip } from "~/_components/chip";

export interface IHourListProps {
	data: any[];
}

export const AvailableHourList: React.FC<IHourListProps> = ({ data }) => {
	const activeHour = "0";

	return (
		<ul className={twMerge("flex", "flex-row", "items-center", "gap-2", "flex-wrap")}>
			{data.map((_, i) => {
				return (
					<li key={i.toString()}>
						<Chip label="9h" isActive={i.toString() === activeHour} />
					</li>
				);
			})}
		</ul>
	);
};
