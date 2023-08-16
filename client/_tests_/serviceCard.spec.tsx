import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceCard } from "../app/_components/service-card";

describe("ServiceCard component", () => {
	const mockData = {
		id: "123",
		name: "Sample Service",
		description: "Sample description",
		price: "R$ 100.00",
		isScheduled: true,
		isClosed: false
	};

	it("renders correctly with provided data", () => {
		render(<ServiceCard data={mockData} />);

		const nameElement = screen.getByText("Sample Service");
		const descriptionElement = screen.getByText("Sample description");
		const priceElement = screen.getByText("R$ 100.00");
		const buttonTextElement = screen.getByText("Agendado");

		expect(nameElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(priceElement).toBeInTheDocument();
		expect(buttonTextElement).toBeInTheDocument();
	});

	it("triggers link to service details page", () => {
		render(<ServiceCard data={mockData} />);

		const linkElement = screen.getByRole("link");

		userEvent.click(linkElement);
	});
});
