export const envSchema = {
	type: "object",
	required: ["PORT", "SECRET"],
	properties: {
		PORT: {
			type: "string",
			default: 3333
		},
		SECRET: {
			type: "string"
		}
	}
};

export const envOptions = {
	confKey: "env", // optional, default: 'config'
	schema: envSchema,
	dotenv: true
};
