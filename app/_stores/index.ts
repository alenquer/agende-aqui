import { atom } from "jotai";
import { atomWithStorage, loadable } from "jotai/utils";

export const $schedules = atom<number>(0);

export const $jwtoken = atomWithStorage("jwtoken", "");

export const $jwtokenAsync = atom(async () => {
	return localStorage.getItem("jwtoken");
});

export const $loadableJWTokenAsync = loadable($jwtokenAsync);
