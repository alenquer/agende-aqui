import { twMerge } from "tailwind-merge";
import { Header } from "~/_components/header";
import { AvailableDayList } from "./_components/available-day-list";
import { AvailableHourList } from "./_components/available-hour-list";
import { BackButton } from "./_components/back-button";
import { SubmitButton } from "./_components/submit-button";

export interface IPageProps {
	params: {
		slug: string;
	};
}

export default async function Page({ params }: IPageProps) {
	const slug = params.slug;

	return (
		<main className={twMerge("flex", "flex-col", "gap-6", "py-4")}>
			<header>
				<Header />
			</header>
			<section
				className={twMerge(
					"w-page-content",
					"mx-auto",
					"flex",
					"flex-col",
					"gap-4",
					"bg-white",
					"p-4",
					"rounded-md",
					"border-[1px]",
					"border-tertiary"
				)}
			>
				<BackButton />
				<div className={twMerge("flex", "flex-row", "items-center", "gap-2")}>
					<div>
						<p className={twMerge("font-semibold", "text-primary", "text-lg")}>Refined Concrete Cheese</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Profissional: </span>
							<span>Gabrielle Hane</span>
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Preço: </span>
							<span>R$ 536.00</span>
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Duração: </span>
							<span>58 minutos</span>
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Descrição: </span>
							<span>
								The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB
								LED Back-lighting for smart functionality
							</span>
						</p>
					</div>
				</div>
				<div
					className={twMerge(
						"flex",
						"flex-row",
						"items-center",
						"gap-2",
						"border-t-[1px]",
						"border-tertiary",
						"flex-wrap",
						"pt-4"
					)}
				>
					<p className={twMerge("text-sm", "text-description")}>Dias disponíveis:</p>
					<AvailableDayList data={[1, 2, 3, 4, 5]} />
				</div>
				<div
					className={twMerge(
						"flex",
						"flex-row",
						"items-center",
						"gap-2",
						"border-t-[1px]",
						"border-tertiary",
						"flex-wrap",
						"pt-4"
					)}
				>
					<p className={twMerge("text-sm", "text-description")}>Horários disponíveis: </p>
					<AvailableHourList data={[1, 2, 3, 4, 5]} />
				</div>
				<div
					className={twMerge(
						"flex",
						"flex-row",
						"items-center",
						"gap-2",
						"border-t-[1px]",
						"border-tertiary",
						"flex-wrap",
						"pt-4"
					)}
				>
					<SubmitButton />
				</div>
			</section>
		</main>
	);
}
