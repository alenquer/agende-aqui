import { FastifyInstance } from "fastify";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

export default async (route: FastifyInstance) => {
	route.post("/api/login", handleLogin);
	route.post("/api/register", handleRegister);
};
