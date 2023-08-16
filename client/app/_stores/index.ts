import { atom } from "jotai";

export const $user = atom<{ token: string; id: string } | null>(null);
