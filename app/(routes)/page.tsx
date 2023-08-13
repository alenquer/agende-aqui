import { twMerge } from "tailwind-merge";
import { Schedules } from "~/_components/schedules";

export default function Home() {
	return (
		<main className="flex flex-col gap-6 py-4">
			<header className="flex flex-row items-center justify-between w-page-content mx-auto">
				<p className="text-lg text-primary font-semibold">Agende</p>
				<Schedules title="Agendamentos" className={twMerge("shadow-md")} />
			</header>
		</main>
	);
}
