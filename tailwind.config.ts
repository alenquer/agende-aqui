import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			width: {
				"page-content": "min(1024px, 90%)"
			},
			screens: {
				mb: "520px"
			},
			colors: {
				primary: "#6E66DD",
				secondary: "#3B30B2"
			}
		}
	},
	plugins: []
};

export default config;
