import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../libs/prisma-client";

export type IDeleteByIdRequest = FastifyRequest<{
	Params: { id: string };
}>;

export type ICreateByIdRequest = FastifyRequest<{
	Body: {
		date: string;
		time: string;
		status: string;
		serviceId: string;
	};
}>;

export const setScheduleById = async (req: ICreateByIdRequest, res: FastifyReply) => {
	try {
		if (!req.body?.serviceId) {
			return res.status(400).send({ error: "Não encontrado.", success: false });
		}

		if (req.routeConfig?.userId) {
			const response = await prisma.service.update({
				data: {
					schedules: {
						create: {
							status: "Agendado",
							date: req.body?.date,
							time: req.body?.time,
							userId: req.routeConfig.userId
						}
					}
				},
				where: {
					id: req.body?.serviceId
				}
			});

			return res.status(200).send({ data: response, success: true });
		} else {
			return res.status(400).send({ error: "Ocorreu um erro.", success: false });
		}
	} catch {
		return res.status(400).send({ error: "Ocorreu um erro.", success: false });
	}
};

export const deleteScheduleById = async (req: IDeleteByIdRequest, res: FastifyReply) => {
	try {
		if (!req.params?.id) {
			return res.status(400).send({ error: "Serviço não encontrado.", success: false });
		}

		const response = await prisma.serviceSchedule.delete({
			where: {
				id: req.params.id
			}
		});

		return res.status(200).send({ data: response, success: true });
	} catch {
		return res.status(400).send({ error: "Ocorreu um erro.", success: false });
	}
};
