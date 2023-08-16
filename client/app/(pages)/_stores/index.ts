import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { IServiceMetadata } from "~/_@types";

export const $filter = atom<string>("desc");

export const $search = atom<string>("");

export const $page = atom<number>(1);

export const $lastUpdate = atom<number>(new Date().getTime());

export const $fetch = atom(async (get) => {
	const limit = 8;
	const page = get($page);
	const search = get($search);
	const filter = get($filter);
	const lastUpdate = get($lastUpdate);

	const response = await fetch(
		`/api/services?page=${page}&search=${search}&limit=${limit}&filter=${filter}&lastUpdate=${lastUpdate}`,
		{
			method: "GET"
		}
	);

	const result: { data: { services: IServiceMetadata[]; count: number } } = await response.json();

	return { ...result, isFetched: true };
});

export const $services = unwrap($fetch, (prev) => prev || { data: { services: [], count: 0 }, isFetched: false });
