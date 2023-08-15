import { FastifyInstance } from "fastify";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

export default async (route: FastifyInstance) => {
	route.post("/login", handleLogin);
	route.post("/register", handleRegister);
};
