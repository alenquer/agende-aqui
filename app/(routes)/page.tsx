import { twMerge } from "tailwind-merge";
import { HeaderSchedules } from "./_components/header-schedules";
import { HomeFilters } from "./_components/home-filters";
import { Paginate } from "./_components/home-paginate";
import { HomeSearch } from "./_components/home-search-bar";
import { Services } from "./_components/services";

export default function Home() {
	return (
		<main className={twMerge("flex", "flex-col", "gap-6", "py-4")}>
			<header
				className={twMerge("flex", "flex-row", "items-center", "justify-between", "w-page-content", "mx-auto")}
			>
				<p className={twMerge("text-lg", "text-primary", "font-semibold")}>Agende</p>
				<HeaderSchedules />
			</header>
			<section className={twMerge("w-page-content", "mx-auto", "flex", "flex-col", "gap-4")}>
				<HomeSearch className={twMerge("shadow-sm")} />
				<HomeFilters />
				<Services />
				<Paginate />
			</section>
		</main>
	);
}
