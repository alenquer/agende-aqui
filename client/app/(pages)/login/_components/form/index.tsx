"use client";

import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { BsPerson } from "react-icons/bs";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { $jwtoken, $loadableJWTokenAsync } from "~/_stores";

export const Form: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const router = useRouter();

	const [jwtoken, setJWToken] = useAtom($jwtoken);

	const jwtokenAsync = useAtomValue($loadableJWTokenAsync);

	const _submitLogin = () => {
		setJWToken("xd");
	};

	const _submitLogout = () => {
		setJWToken("");
	};

	return jwtokenAsync.state === "loading" ? (
		<p className={twMerge("text-sm")}>Carregando...</p>
	) : (
		<div
			className={twMerge(
				"flex",
				"flex-col",
				"w-96",
				"gap-4",
				"border-[1px]",
				"border-tertiary",
				"p-4",
				"rounded-md",
				"shadow-sm",
				className
			)}
		>
			<div className={twMerge("flex", "flex-row", "gap-3", "items-center")}>
				<button className={twMerge("hover:opacity-50")} onClick={router.back}>
					<IoChevronBackCircleSharp color="#6E66DD" size={24} />
				</button>
				<p className={twMerge("text-lg", "font-semibold", "text-primary")}>{jwtoken ? "Logout" : "Login"}</p>
			</div>
			{jwtoken ? (
				<div>
					<button
						onClick={_submitLogout}
						className={twMerge(
							"h-9",
							"w-full",
							"bg-red-500",
							"text-white",
							"font-semibold",
							"rounded-md",
							"text-sm",
							"hover:opacity-50"
						)}
					>
						Sair
					</button>
				</div>
			) : (
				<div>
					<div className={twMerge("flex", "flex-col", "gap-4")}>
						<div className={twMerge("flex", "flex-col", "gap-2")}>
							<div className={twMerge("flex", "flex-row", "gap-3", "items-center")}>
								<BsPerson size={24} color="#111" />
								<input
									className={twMerge(
										"h-9",
										"w-full",
										"bg-slate-200",
										"rounded-md",
										"p-2",
										"text-sm",
										"text-slate-500"
									)}
									placeholder="Usuário"
								/>
							</div>
							<div className={twMerge("flex", "flex-row", "gap-3", "items-center")}>
								<PiPassword size={24} color="#111" />
								<input
									className={twMerge(
										"h-9",
										"w-full",
										"bg-slate-200",
										"rounded-md",
										"p-2",
										"text-sm",
										"text-slate-500"
									)}
									placeholder="Senha"
								/>
							</div>
						</div>
						<div className={twMerge("flex", "flex-col", "sm:flex-row", "gap-2", "items-center")}>
							<button
								onClick={_submitLogin}
								className={twMerge(
									"h-9",
									"w-full",
									"bg-primary",
									"text-white",
									"font-semibold",
									"rounded-md",
									"text-sm",
									"hover:opacity-50"
								)}
							>
								Entrar
							</button>
							<button
								className={twMerge(
									"h-9",
									"w-full",
									"bg-primary",
									"text-white",
									"font-semibold",
									"rounded-md",
									"text-sm",
									"hover:opacity-50"
								)}
							>
								Registrar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
