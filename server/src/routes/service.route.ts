import { FastifyInstance } from "fastify";
import { getServiceById, getServices } from "../controllers/service.controller";

export default async (route: FastifyInstance) => {
	route.get("/services", getServices);
	route.get("/services/:id", getServiceById);
};
