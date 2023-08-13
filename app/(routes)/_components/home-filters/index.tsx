"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { $filter } from "~/(routes)/_stores";
import { Chip } from "~/_components/chip";

const filterList = [
	{
		id: "all",
		label: "Todos"
	},
	{
		id: "0-100",
		label: "R$ 0-100"
	},
	{
		id: "100-500",
		label: "R$ 100-500"
	}
];

export const HomeFilters: React.FC = () => {
	const constraintsRef = useRef<HTMLDivElement>(null);

	const [isActive, setIsActive] = useAtom($filter);

	return (
		<div ref={constraintsRef}>
			<motion.ul
				className={twMerge("flex", "flex-row", "gap-3", "items-center")}
				drag="x"
				animate={{ x: 0 }}
				dragConstraints={constraintsRef}
			>
				{filterList.map((filter) => (
					<li key={filter.id}>
						<Chip
							label={filter.label}
							isActive={filter.id === isActive}
							onClick={() => setIsActive(filter.id)}
							className={twMerge("shadow-md")}
						/>
					</li>
				))}
			</motion.ul>
		</div>
	);
};
