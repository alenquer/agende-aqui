import { FastifyInstance } from "fastify";
import { deleteScheduleById, getScheduleByProfessional, setScheduleById } from "../controllers/schedule.controller";
import { authMiddle } from "../middlers";

export default async (route: FastifyInstance) => {
	route.addHook("onRequest", authMiddle);
	route.get("/schedules/:professional", getScheduleByProfessional);
	route.post("/schedules/:id", setScheduleById);
	route.delete("/schedules/:id", deleteScheduleById);
};
