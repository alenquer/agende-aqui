import { FastifyInstance } from "fastify";
import { deleteScheduleById, setScheduleById } from "../controllers/schedule.controller";
import { authMiddle } from "../middlers";

export default async (route: FastifyInstance) => {
	route.addHook("onRequest", authMiddle);
	route.post("/api/schedules", setScheduleById);
	route.delete("/api/schedules/:id", deleteScheduleById);
};
