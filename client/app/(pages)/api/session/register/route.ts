import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: NextRequest) {
	const body = await request.json();

	const { email, password } = body;

	const registerRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
		method: "POST",
		cache: "no-store",
		body: JSON.stringify({ email, password }),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	});

	const result = await registerRes.json();

	if (!result?.success) {
		return NextResponse.json(
			{
				message: "Unauthorized"
			},
			{
				status: 401
			}
		);
	}

	// Always check this
	const secret = process.env.SECRET || "";

	const token = sign(
		{
			id: result.data.user.id
		},
		secret,
		{
			expiresIn: MAX_AGE
		}
	);

	const serialized = serialize("jwtoken", token, {
		httpOnly: true,
		// needs https
		secure: false,
		sameSite: "strict",
		maxAge: MAX_AGE,
		path: "/"
	});

	return NextResponse.json(
		{
			data: {
				id: result.data.user.id,
				token: result.data.token
			},
			success: true
		},
		{
			status: 200,
			headers: { "Set-Cookie": serialized }
		}
	);
}
