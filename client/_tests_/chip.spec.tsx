import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "../app/_components/chip";

describe("Chip component", () => {
	it("renders the label correctly", () => {
		render(<Chip label="Test Chip" />);

		const chipLabel = screen.getByText("Test Chip");

		expect(chipLabel).toBeInTheDocument();
	});

	it("applies active styles when isActive is true", () => {
		render(<Chip label="Active Chip" isActive />);

		const chipButton = screen.getByRole("button");

		expect(chipButton).toHaveClass("bg-primary");

		expect(chipButton).toHaveTextContent("Active Chip");
	});

	it("applies inactive styles when isActive is false", () => {
		render(<Chip label="Inactive Chip" isActive={false} />);

		const chipButton = screen.getByRole("button");

		expect(chipButton).toHaveClass("bg-slate-200");

		expect(chipButton).toHaveTextContent("Inactive Chip");
	});
});
