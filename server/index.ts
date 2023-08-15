import fastifyEnv from "@fastify/env";
import { FastifyInstance } from "fastify";
import App from "./src";
import { envOptions } from "./src/configs";

const fastify: FastifyInstance = App({
	logger: true
});

fastify.register(fastifyEnv, envOptions).ready(async (err) => {
	if (err) fastify.log.error(err);

	return fastify.listen({ port: 3333 }, (err) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	});
});
