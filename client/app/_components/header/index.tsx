"use client";
import { useAtom } from "jotai";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { $user } from "~/_stores";

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const [user, setUser] = useAtom($user);

	const _submitLogout = async () => {
		const response = await fetch("/api/session/logout", { method: "GET" });

		const result = await response.json();

		if (result?.success) setUser({ id: "", token: "" });
	};

	return (
		<div
			className={twMerge(
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"w-page-content",
				"mx-auto",
				className
			)}
		>
			<Link href={"/"} className={twMerge("hover:opacity-50")}>
				<p className={twMerge("text-lg", "text-primary", "font-semibold")}>Agende</p>
			</Link>
			{user === null ? (
				<p className={twMerge("text-sm")}>Carregando...</p>
			) : (
				<div className={twMerge("flex", "flex-row", "gap-3", "items-center")}>
					{user?.id ? (
						<button
							onClick={_submitLogout}
							className={twMerge(
								"text-sm",
								"hover:opacity-50",
								"px-4",
								"py-2",
								"text-white",
								"bg-red-400",
								"rounded-md",
								"shadow-md",
								"font-semibold"
							)}
						>
							Sair
						</button>
					) : (
						<Link href="/login">
							<button
								className={twMerge(
									"text-sm",
									"px-4",
									"py-2",
									"hover:opacity-50",
									"bg-primary",
									"text-white",
									"rounded-md",
									"shadow-md",
									"font-semibold"
								)}
							>
								Entrar
							</button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};
