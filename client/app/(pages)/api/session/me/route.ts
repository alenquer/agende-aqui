import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface IJWToken {
	id: string;
	iat: number;
	exp: number;
}

export async function GET() {
	const cookieStore = cookies();

	const token = cookieStore.get("jwtoken");

	if (!token) {
		return NextResponse.json(
			{
				message: "Unauthorized"
			},
			{
				status: 401
			}
		);
	}

	const { value } = token;

	// Always check this
	const secret = process.env.SECRET || "";

	try {
		const { id } = verify(value, secret) as IJWToken;

		return NextResponse.json(
			{
				data: {
					id,
					token: value
				},
				success: true
			},
			{ status: 200 }
		);
	} catch (e) {
		return NextResponse.json(
			{
				message: "Something went wrong"
			},
			{
				status: 400
			}
		);
	}
}
