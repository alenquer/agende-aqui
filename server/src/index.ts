import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import middie from "@fastify/middie";
import fastify, { FastifyServerOptions } from "fastify";
import authRoute from "./routes/auth.route";
import scheduleRoute from "./routes/schedule.route";
import serviceRoute from "./routes/service.route";

// this declaration must be in scope of the typescript interpreter to work
// if prop type is defined here, the value will be type checked when you call decorate {Request, Reply}
declare module "fastify" {
	interface FastifyContextConfig {
		// you must reference the interface and not the type
		userId: string;
	}

	interface FastifyInstance {
		env: {
			// this should be same as the confKey in options
			// specify your typing here
			PORT?: string;
			SECRET: string;
		};
	}
}

const App = (options: FastifyServerOptions) => {
	const app = fastify(options);

	// Registers
	app.register(cors);
	app.register(middie);
	app.register(formBody);

	// Routes
	app.register(serviceRoute);
	app.register(scheduleRoute);
	app.register(authRoute);

	// Declare a route
	app.get("/", async function handler() {
		return { hello: "world" };
	});

	return app;
};

export default App;
