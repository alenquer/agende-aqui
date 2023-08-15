import { twMerge } from "tailwind-merge";
import { Form } from "./_components/form";

export default async function Page() {
	return (
		<main className={twMerge("h-screen", "flex", "bg-white", "justify-center", "items-center")}>
			<Form className={twMerge("m-4")} />
		</main>
	);
}
