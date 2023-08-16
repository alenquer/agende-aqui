"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { startTransition, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { $user } from "~/_stores";

export const Form: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const router = useRouter();

	const isValidatingRef = useRef<boolean>(false);

	const [user, setUser] = useAtom($user);

	const [email, setEmail] = useState<string>("");

	const [password, setPassword] = useState<string>("");

	const [loading, setLoading] = useState<boolean>(false);

	const _submitLogin = async () => {
		if (!password || !email) return alert("Preencha todos os campos");

		if (isValidatingRef.current) return alert("Por favor, aguarde.");

		setLoading(true);

		const response = await fetch("/api/session/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		});

		const result = await response.json();

		if (result?.success) {
			setUser(result.data);
			router.replace("/");
		} else {
			alert("Ocorreu um erro.");
			setLoading(false);
		}
	};

	const _submitRegister = async () => {
		if (!password || !email) return alert("Preencha todos os campos");

		if (isValidatingRef.current) return alert("Por favor, aguarde.");

		setLoading(true);

		const response = await fetch("/api/session/register", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		});

		const result = await response.json();

		if (!result?.success) {
			alert("Ocorreu um erro.");
			setLoading(false);
		} else {
			setUser(result.data);
			router.replace("/");
		}
	};

	const _submitLogout = async () => {
		const response = await fetch("/api/session/logout", { method: "GET" });

		const result = await response.json();

		if (result?.success) setUser({ id: "", token: "" });
	};

	return !user || loading ? (
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
				<p className={twMerge("text-lg", "font-semibold", "text-primary")}>{user?.id ? "Logout" : "Login"}</p>
			</div>
			{user?.id ? (
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
									placeholder="E-mail"
									value={email}
									onChange={(e) => {
										startTransition(() => {
											setEmail(e.target.value);
										});
									}}
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
									type="password"
									value={password}
									onChange={(e) => {
										startTransition(() => {
											setPassword(e.target.value);
										});
									}}
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
								onClick={_submitRegister}
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
