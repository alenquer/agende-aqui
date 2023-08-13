"use client";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import { $schedules } from "~/(routes)/_stores";
import { Schedules } from "~/_components/schedules";

export const HeaderSchedules: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const scheduleCount = useAtomValue($schedules);

	return <Schedules title="Agendamentos" qty={scheduleCount} className={twMerge("shadow-sm", className)} />;
};
