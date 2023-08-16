"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { $filter } from "~/(pages)/_stores";
import { Chip } from "~/_components/chip";

const filterList = [
	{
		id: "desc",
		label: "Mais recentes"
	},
	{
		id: "asc",
		label: "Mais antigos"
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
