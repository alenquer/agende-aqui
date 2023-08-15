import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../libs/prisma-client";

export type IServiceByIdRequest = FastifyRequest<{
	Params: { id: string };
}>;

export const getServices = async () => {
	return await prisma.service.findMany();
};

export const getServiceById = async (req: IServiceByIdRequest, res: FastifyReply) => {
	if (!req.params?.id) {
		return res.status(401).send({ error: "Ocorreu um erro.", success: false });
	}

	const response = await prisma.service.findUnique({
		where: {
			id: req.params.id
		},
		include: {
			...(req.routeConfig?.userId && {
				schedules: {
					where: {
						id: req.routeConfig.userId
					}
				}
			}),
			availabilities: true
		}
	});

	if (response) {
		return res.status(200).send({
			data: {
				...response,
				availability: response.availabilities.map((item) => item.availability)
			},
			success: true
		});
	}

	return res.status(200).send({ data: response, success: true });
};
