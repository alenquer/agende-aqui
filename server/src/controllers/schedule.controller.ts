import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../libs/prisma-client";

export type IScheduleByProfessionalRequest = FastifyRequest<{
	Params: {
		professional: string;
	};
}>;

export type IScheduleByIdRequest = FastifyRequest<{
	Params: { id: string };
}>;

export type IServiceByIdRequest = FastifyRequest<{
	Params: { id: string };
	Body: {
		date: string;
		time: string;
		status: string;
	};
}>;

export const getScheduleByProfessional = async (req: IScheduleByProfessionalRequest, res: FastifyReply) => {
	if (!req.params?.professional) {
		return res.status(401).send({ error: "Profissional não informado.", success: false });
	}

	const response = await prisma.service.findFirst({
		where: {
			professional: {
				equals: req.params.professional,
				mode: "insensitive"
			}
		},
		include: {
			availabilities: true
		}
	});

	if (response) {
		return res.status(200).send({
			data: {
				professional: response.professional,
				available_slots: response.availabilities.map((item) => item.availability)
			},
			success: true
		});
	}

	return res.status(200).send({ data: response, success: true });
};

export const setScheduleById = async (req: IServiceByIdRequest, res: FastifyReply) => {
	if (!req.params?.id) {
		return res.status(401).send({ error: "Não encontrado.", success: false });
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
				id: req.params.id
			}
		});

		return res.status(200).send({ data: response, success: true });
	} else {
		return res.status(401).send({ error: "Ocorreu um erro.", success: false });
	}
};

export const deleteScheduleById = async (req: IServiceByIdRequest, res: FastifyReply) => {
	if (!req.params?.id) {
		return res.status(401).send({ error: "Serviço não encontrado.", success: false });
	}

	const response = await prisma.serviceSchedule.delete({
		where: {
			id: req.params.id
		}
	});

	return res.status(200).send({ data: response, success: true });
};
