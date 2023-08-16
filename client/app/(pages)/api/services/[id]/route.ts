import { cookies } from "next/headers";
import { getService } from "~/_services";
import { NextResponse } from "next/server";

interface IRouteProps {
	params: { id: string };
}

export async function GET(req: Request, route: IRouteProps) {
	const cookieStore = cookies();

	const token = cookieStore.get("jwtoken");

	if (!route.params?.id) return NextResponse.json({ success: false }, { status: 400 });

	const response = await getService({
		id: route.params?.id,
		authorization: token ? `Bearer ${token.value}` : ""
	});

	return NextResponse.json(response, { status: 200 });
}
