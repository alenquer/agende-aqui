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
	},
	{
		id: "500more",
		label: "R$ 500+"
	}
];

export const Filters: React.FC = () => {
	const constraintsRef = useRef<HTMLDivElement>(null);

	const [currentFilter, setCurrentFilter] = useAtom($filter);

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
							isActive={filter.id === currentFilter}
							onClick={() => setCurrentFilter(filter.id)}
							className={twMerge("shadow-sm")}
						/>
					</li>
				))}
			</motion.ul>
		</div>
	);
};
