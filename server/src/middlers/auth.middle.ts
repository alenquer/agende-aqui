import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export interface IJWToken {
	id: string;
	iat: number;
	exp: number;
}

export default async function authMiddle(req: FastifyRequest, res: FastifyReply) {
	if (!req.headers?.authorization) {
		return res.status(401).send({ error: "No token provided" });
	}

	const parts = req.headers.authorization.split(" ");

	const [scheme, token] = parts;

	if (parts.length !== 2) return res.status(401).send({ error: "Format error code 1" });

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: "Format error code 2" });

	try {
		const { id } = jwt.verify(token, req.server.env.SECRET) as IJWToken;

		req.routeConfig.userId = id;
	} catch (error) {
		res.status(401).send({ error: "An error ocurred." });
	}
}
