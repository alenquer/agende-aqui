"use client";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Cart } from "~/_components/cart";
import { $schedules } from "~/_stores";

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const schedules = useAtomValue($schedules);

	return (
		<div
			className={twMerge(
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"w-page-content",
				"mx-auto",
				className
			)}
		>
			<Link href={"/"} className={twMerge("hover:opacity-50")}>
				<p className={twMerge("text-lg", "text-primary", "font-semibold")}>Agende</p>
			</Link>
			<Cart title="Agendamentos" qty={schedules} className={twMerge("shadow-sm")} />
		</div>
	);
};
