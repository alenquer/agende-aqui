import { FastifyInstance } from "fastify";
import { getServiceById, getServiceByProfessional, getServices } from "../controllers/service.controller";

export default async (route: FastifyInstance) => {
	route.get("/api/services", getServices);
	route.get("/api/services/:id", getServiceById);
	route.get("/api/availability", getServiceByProfessional);
};
