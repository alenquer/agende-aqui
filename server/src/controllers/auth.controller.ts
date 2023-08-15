import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma-client";

export type IRegisterRequest = FastifyRequest<{
	Body: {
		email: string;
		password: string;
	};
}>;

export type ILoginRequest = FastifyRequest<{
	Body: {
		email: string;
		password: string;
	};
}>;

export const handleLogin = async (req: ILoginRequest, res: FastifyReply) => {
	if (!req.body?.email || !req.body?.password) {
		return res.status(400).send({ error: "Ocorreu um erro.", success: false });
	}

	const response = await prisma.user.findFirst({
		where: {
			email: {
				equals: req.body.email.toLowerCase()
			}
		}
	});

	if (!response) return res.status(400).send({ error: "Usuário não encontrado!", success: false });

	const checkPassword = await bcrypt.compare(req.body.password, response.password);

	if (!checkPassword) return res.status(403).send({ error: "Invalid password", success: false });

	const { password, ...user } = response;

	const token = jwt.sign({ id: user.id }, req.server.env.SECRET, {
		expiresIn: 86400
	});

	return res.status(200).send({ data: { user: { ...user }, token } });
};

export const handleRegister = async (req: IRegisterRequest, res: FastifyReply) => {
	if (!req.body?.email || !req.body?.password) {
		return res.status(400).send({ error: "Um erro foi encontrado.", success: false });
	}

	const hasUser = await prisma.user.findFirst({
		where: {
			email: {
				equals: req.body.email.toLowerCase(),
				mode: "insensitive"
			}
		}
	});

	if (hasUser) return res.status(400).send({ error: "O usuário já existe.", success: false });

	const hashPassword = await bcrypt.hash(req.body.password, 10);

	const response = await prisma.user.create({
		data: {
			email: req.body.email.toLowerCase(),
			password: hashPassword
		}
	});

	const { password, ...user } = response;

	const token = jwt.sign({ id: user.id }, req.server.env.SECRET, {
		expiresIn: 86400
	});

	return res.status(200).send({ data: { user: { ...user }, token }, success: true });
};
