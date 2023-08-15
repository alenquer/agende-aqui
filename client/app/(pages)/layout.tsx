import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { JotaiProvider } from "~/_providers/jotai.provider";
import { inter } from "~/_shared";
import "./styles.css";

export const metadata: Metadata = {
	title: "Agende | Portal de busca de profissionais",
	description: "Encontre os melhores profissionais e agende a sua visita."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<JotaiProvider>
				<body className={twMerge(inter.className)}>{children}</body>
			</JotaiProvider>
		</html>
	);
}
