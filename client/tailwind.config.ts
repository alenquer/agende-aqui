import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			width: {
				"page-content": "min(1024px, 90%)"
			},
			screens: {
				small: "380px",
				mb: "520px"
			},
			colors: {
				primary: "#6E66DD",
				secondary: "#3B30B2",
				tertiary: "#1111111a",
				description: "#11111199"
			}
		}
	},
	plugins: []
};

export default config;
