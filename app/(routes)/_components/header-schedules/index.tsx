"use client";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import { $schedules } from "~/(routes)/_stores";
import { Schedules } from "~/_components/schedules";

export const HeaderSchedules: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const schedules = useAtomValue($schedules);

	return <Schedules title="Agendamentos" qty={schedules} className={twMerge("shadow-md", className)} />;
};
