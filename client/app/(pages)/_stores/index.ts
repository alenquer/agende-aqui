import { atom } from "jotai";

export const $filter = atom<string>("all");

export const $search = atom<string>("");

export const $page = atom<number>(1);
