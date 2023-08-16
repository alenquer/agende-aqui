"use client";
import { twMerge } from "tailwind-merge";
import { Header } from "~/_components/header";
import { BackButton } from "./_components/back-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IScheduleProps, IServiceMetadata } from "~/_@types";
import { useAtomValue, useSetAtom } from "jotai";
import { $user } from "~/_stores";
import { $lastUpdate } from "~/(pages)/_stores";
import { Chip } from "~/_components/chip";
import { convertDayNamesToPortuguese, getNearestDayTime } from "~/_utils";

async function _handleDelete(id: string, authorization?: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/${id}`, {
		method: "DELETE",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
			...(!!authorization && {
				Authorization: authorization
			})
		}
	});

	return await response.json();
}

async function _handleCreate(data: IScheduleProps, authorization?: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules`, {
		method: "POST",
		cache: "no-store",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			...(!!authorization && {
				Authorization: authorization
			})
		}
	});

	return await response.json();
}

export interface IPageProps {
	params: {
		slug: string;
	};
}

export default function Page({ params }: IPageProps) {
	const slug = params.slug;

	const router = useRouter();

	const setLastUpdate = useSetAtom($lastUpdate);

	const user = useAtomValue($user);

	const [data, setData] = useState<IServiceMetadata | null>(null);

	const [loading, setLoading] = useState<boolean>(true);

	const [schedule, setSchedule] = useState<IScheduleProps | null>(null);

	useEffect(() => {
		async function init() {
			const response = await fetch(`/api/services/${slug}`, { method: "GET" });

			const result = await response.json();

			if (!result?.success) {
				return router.replace("/");
			}

			setData(result.data);

			if (result.data?.schedules) {
				setSchedule(result.data.schedules[0]);
			}

			setLoading(false);
		}

		init();
	}, [slug, router]);

	const _handleSubmit = async () => {
		if (!slug) return alert("Serviço não encontrado.");

		if (!schedule) return alert("Preencha as informações.");

		let result = { success: false };

		let authorization = user?.token ? `Bearer ${user.token}` : "";

		setLoading(true);

		if (schedule.status === "Agendado" && schedule?.id) {
			result = await _handleDelete(schedule.id, authorization);
		} else {
			result = await _handleCreate({ ...schedule, serviceId: slug }, authorization);
		}

		if (!result?.success) {
			alert("Ocorreu um erro.");
			setLoading(false);
		} else {
			setLastUpdate(new Date().getTime());
			router.back();
		}
	};

	const _handleNearestTime = (value: string) => {
		const [day, time] = value.split(" ");

		const date = getNearestDayTime(day, "0", "0");

		if (!time || !date || !day) return { date: "", time: "", status: "error" };

		return { date, time, status: "pendente" };
	};

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
						<p className={twMerge("font-semibold", "text-primary", "text-lg")}>
							{loading ? "Carregando..." : data?.name || "Nome não informado."}
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Profissional: </span>
							<span>{data?.professional || "Não informado."}</span>
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Preço: </span>
							<span>{data?.price || "Não informado."}</span>
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Duração: </span>
							<span>{data?.duration || "Não informado."}</span>
						</p>
						<p className={twMerge("text-sm", "text-description")}>
							<span>Descrição: </span>
							<span>{data?.description || "Não informado."}</span>
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
					<p className={twMerge("text-sm", "text-description")}>Horários disponíveis: </p>
					<ul className={twMerge("flex", "flex-row", "items-center", "gap-2", "flex-wrap")}>
						{data?.availability?.map((label, i) => {
							const nearestDate = _handleNearestTime(label);
							const isActive = nearestDate?.date === schedule?.date;

							return (
								<li key={i}>
									<Chip
										label={convertDayNamesToPortuguese(label)}
										isActive={isActive}
										onClick={() => {
											if (schedule?.status === "Agendado" || nearestDate?.status === "error") {
												return alert("Não é possível alterar a data.");
											}

											if (isActive) {
												setSchedule(null);
											} else {
												setSchedule(_handleNearestTime(label));
											}
										}}
									/>
								</li>
							);
						})}
					</ul>
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
					{loading ? (
						<p className={twMerge("text-sm")}>Carregando...</p>
					) : (
						<button
							onClick={_handleSubmit}
							className={twMerge(
								"py-2",
								"px-6",
								"w-max",
								"rounded-md",
								"hover:opacity-50",
								schedule?.status === "Agendado" ? "bg-red-400" : !schedule ? "bg-slate-400" : "bg-primary"
							)}
						>
							<span className={twMerge("font-semibold", "text-white", "text-sm")}>
								{schedule?.status === "Agendado" ? "Cancelar" : "Agendar"}
							</span>
						</button>
					)}
				</div>
			</section>
		</main>
	);
}
