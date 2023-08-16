import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = cookies();

	cookieStore.set("jwtoken", "");

	return NextResponse.json(
		{
			success: true
		},
		{ status: 200 }
	);
}
