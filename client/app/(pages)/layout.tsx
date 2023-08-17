import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { AuthProvider } from "~/_providers/auth.provider";
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
			<body className={twMerge(inter.className)}>
				<JotaiProvider>
					<AuthProvider>{children}</AuthProvider>
				</JotaiProvider>
			</body>
		</html>
	);
}
