import { atom } from "jotai";

export const $filter = atom<string>("all");

export const $search = atom<string>("");

export const $schedules = atom<number>(0);

export const $page = atom<number>(1);
