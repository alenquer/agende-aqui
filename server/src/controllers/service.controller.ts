import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../libs/prisma-client";
import { getUserId } from "../middlers/auth.middle";

export type IServiceByIdRequest = FastifyRequest<{
	Params: { id: string };
}>;

export type IServiceListRequest = FastifyRequest<{
	Querystring: { page: number; limit: number; search: string; filter: "asc" | "desc" };
}>;

export type IServiceByProfessionalRequest = FastifyRequest<{
	Body: {
		professional: string;
	};
}>;

export const getServices = async (req: IServiceListRequest, res: FastifyReply) => {
	try {
		const PAGE = Number(req.query?.page || 1);
		const TAKE_LIMIT = Number(req.query?.limit || 8);
		const SEARCH = req.query?.search;
		const FILTER = req.query?.filter || "desc";

		const userId = getUserId(req.headers?.authorization, req.server.env.SECRET);

		const services = await prisma.service.findMany({
			...(SEARCH && {
				where: {
					name: {
						contains: SEARCH,
						mode: "insensitive"
					}
				}
			}),
			...(FILTER && {
				orderBy: {
					createdAt: FILTER
				}
			}),
			...(!!userId && {
				include: {
					schedules: {
						where: { userId }
					}
				}
			}),
			skip: (PAGE - 1) * TAKE_LIMIT,
			take: TAKE_LIMIT
		});

		const serviceCount = await prisma.service.count({
			...(SEARCH && {
				where: {
					name: {
						contains: SEARCH,
						mode: "insensitive"
					}
				}
			})
		});

		return res.status(200).send({ data: { services, count: serviceCount }, success: true });
	} catch {
		return res.status(400).send({ data: { services: [], count: 0 }, success: false });
	}
};

export const getServiceById = async (req: IServiceByIdRequest, res: FastifyReply) => {
	try {
		if (!req.params?.id) {
			return res.status(400).send({ error: "Ocorreu um erro.", success: false });
		}

		const userId = getUserId(req.headers?.authorization, req.server.env.SECRET);

		const response = await prisma.service.findUnique({
			where: {
				id: req.params.id
			},
			include: {
				...(!!userId && {
					schedules: {
						where: {
							userId
						}
					}
				})
			}
		});

		return res.status(200).send({ data: response, success: true });
	} catch {
		return res.status(400).send({ data: null, success: false });
	}
};

export const getServiceByProfessional = async (req: IServiceByProfessionalRequest, res: FastifyReply) => {
	try {
		if (!req.body?.professional) {
			return res.status(400).send({ error: "Profissional não informado.", success: false });
		}

		const response = await prisma.service.findFirst({
			where: {
				professional: {
					equals: req.body.professional,
					mode: "insensitive"
				}
			}
		});

		if (response) {
			return res.status(200).send({
				data: {
					professional: response.professional,
					available_slots: response.availability
				},
				success: true
			});
		}

		return res.status(200).send({ data: null, success: true });
	} catch {
		return res.status(400).send({ data: null, success: false });
	}
};
