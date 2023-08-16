"use client";
import { useSetAtom } from "jotai";
import { createContext, useEffect } from "react";
import { $user } from "~/_stores";

export const AuthContext = createContext({});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const setUser = useSetAtom($user);

	useEffect(() => {
		const init = async () => {
			const response = await fetch("/api/session/me", { method: "GET", cache: "no-store" });

			const result = await response.json();

			if (result?.success) {
				setUser(result.data);
			} else {
				setUser({ id: "", token: "" });
			}
		};

		init();
	}, [setUser]);

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
