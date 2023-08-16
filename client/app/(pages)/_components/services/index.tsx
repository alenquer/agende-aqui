"use client";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import { $services } from "~/(pages)/_stores";
import { ServiceCard } from "~/_components/service-card";

export const Services: React.FC = () => {
	const { data, isFetched } = useAtomValue($services);

	return !isFetched ? (
		<p className={twMerge("text-sm", "text-description")}>Carregando...</p>
	) : !data.count ? (
		<p className={twMerge("text-sm", "text-description")}>Nenhum serviço encontrado.</p>
	) : (
		<ul className={twMerge("grid", "small:grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-4", "gap-6")}>
			{data.services.map((service) => {
				return (
					<ServiceCard
						key={service.id}
						data={{
							...service,
							isScheduled: service?.schedules && service.schedules.length > 0,
							isClosed: service.availability.length === 0
						}}
						className={twMerge("shadow-sm")}
					/>
				);
			})}
		</ul>
	);
};
