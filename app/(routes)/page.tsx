import { twMerge } from "tailwind-merge";
import { Cart } from "./_components/cart";
import { Filters } from "./_components/filters";
import { Paginate } from "./_components/paginate";
import { SearchBar } from "./_components/search-bar";
import { Services } from "./_components/services";

export default function Home() {
	return (
		<main className={twMerge("flex", "flex-col", "gap-6", "py-4")}>
			<header
				className={twMerge("flex", "flex-row", "items-center", "justify-between", "w-page-content", "mx-auto")}
			>
				<p className={twMerge("text-lg", "text-primary", "font-semibold")}>Agende</p>
				<Cart />
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
