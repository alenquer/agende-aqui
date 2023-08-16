import { IServiceMetadata } from "~/_@types";

export async function getServices(props?: {
	page?: number;
	limit?: number;
	search?: string | null;
	filter?: string | null;
	authorization?: string;
}): Promise<{ data: { services: IServiceMetadata[]; count: number }; success: boolean }> {
	const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);

	if (props?.page) url.searchParams.set("page", props.page.toString());

	if (props?.limit) url.searchParams.set("limit", props.limit.toString());

	if (props?.search) url.searchParams.set("search", props.search.toString());

	if (props?.filter) url.searchParams.set("filter", props.filter.toString());

	const response = await fetch(url.toString(), {
		method: "GET",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
			...(!!props?.authorization && {
				Authorization: props.authorization
			})
		}
	});

	const result = await response.json();

	if (!result?.success) return { data: { services: [], count: 0 }, success: false };

	return result;
}

export async function getService(props: {
	id: string;
	authorization?: string;
}): Promise<{ data: IServiceMetadata | null; success: boolean }> {
	const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${props.id}`);

	const response = await fetch(url.toString(), {
		method: "GET",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
			...(!!props?.authorization && {
				Authorization: props.authorization
			})
		}
	});

	const result = await response.json();

	if (!result?.success) return { data: null, success: false };

	return result;
}
