import { twMerge } from "tailwind-merge";
import { Header } from "~/_components/header";
import { Filters } from "./_components/filters";
import { Paginate } from "./_components/paginate";
import { SearchBar } from "./_components/search-bar";
import { Services } from "./_components/services";

export default async function Home() {
	return (
		<main className={twMerge("flex", "flex-col", "gap-6", "py-4")}>
			<header>
				<Header />
			</header>
			<section className={twMerge("w-page-content", "mx-auto", "flex", "flex-col", "gap-4")}>
				<SearchBar className={twMerge("shadow-sm")} />
				<Filters />
				<Services />
				<Paginate />
			</section>
		</main>
	);
}
