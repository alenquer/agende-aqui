"use client";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import { $schedules } from "~/(routes)/_stores";
import { Cart as DefaultCart } from "~/_components/cart";

export const Cart: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const scheduleCount = useAtomValue($schedules);

	return <DefaultCart title="Agendamentos" qty={scheduleCount} className={twMerge("shadow-sm", className)} />;
};
