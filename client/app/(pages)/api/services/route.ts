import { cookies } from "next/headers";
import { getServices } from "~/_services";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const cookieStore = cookies();

	const token = cookieStore.get("jwtoken");

	const url = new URL(req.url);

	const page = Number(url.searchParams.get("page") || 1);

	const limit = Number(url.searchParams.get("limit") || 8);

	const search = url.searchParams.get("search");

	const filter = url.searchParams.get("filter");

	const response = await getServices({
		page,
		filter,
		limit,
		search,
		authorization: token ? `Bearer ${token.value}` : ""
	});

	return NextResponse.json(response, { status: 200 });
}
