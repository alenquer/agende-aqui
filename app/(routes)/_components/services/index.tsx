import { twMerge } from "tailwind-merge";
import { ServiceCard } from "~/_components/service-card";

const serviceList = [
	{
		id: "1",
		title: "Empresa",
		description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		price: "R$ 100,00"
	},
	{
		id: "2",
		title: "Empresa",
		description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		price: "R$ 100,00"
	},
	{
		id: "3",
		title: "Empresa",
		description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		price: "R$ 100,00"
	},
	{
		id: "4",
		title: "Empresa",
		description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		price: "R$ 100,00"
	},
	{
		id: "5",
		title: "Empresa",
		description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		price: "R$ 100,00"
	}
];

export const Services: React.FC = () => {
	return (
		<ul className={twMerge("grid", "small:grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-4", "gap-6")}>
			{serviceList.map((service) => {
				return (
					<ServiceCard
						key={service.id}
						price={service.price}
						title={service.title}
						description={service.description}
						className={twMerge("shadow-sm")}
					/>
				);
			})}
		</ul>
	);
};
