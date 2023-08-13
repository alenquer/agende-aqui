import type { Metadata } from "next";
import { inter } from "~/_shared";
import "./styles.css";

export const metadata: Metadata = {
	title: "Agende | Portal de busca de profissionais",
	description: "Encontre os melhores profissionais e agende a sua visita."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
