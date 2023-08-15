"use client";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Cart } from "~/_components/cart";
import { $jwtoken, $loadableJWTokenAsync, $schedules } from "~/_stores";

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const schedules = useAtomValue($schedules);

	const [jwtoken, setJWToken] = useAtom($jwtoken);

	const jwtokenAsync = useAtomValue($loadableJWTokenAsync);

	const _submitLogout = () => {
		setJWToken("");
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
			{jwtokenAsync.state === "loading" ? (
				<p className={twMerge("text-sm")}>Carregando...</p>
			) : (
				<div className={twMerge("flex", "flex-row", "gap-3", "items-center")}>
					{jwtoken ? (
						<button onClick={_submitLogout} className={twMerge("text-sm", "hover:opacity-50")}>
							Sair
						</button>
					) : (
						<Link href="/login" className={twMerge("hover:opacity-50")}>
							<button className={twMerge("text-sm")}>Entrar</button>
						</Link>
					)}
					<Cart title="Agendamentos" qty={schedules} className={twMerge("shadow-sm")} />
				</div>
			)}
		</div>
	);
};
