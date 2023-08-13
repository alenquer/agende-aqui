"use client";
import { useSetAtom } from "jotai";
import { startTransition, useEffect, useState } from "react";
import { $search } from "~/(routes)/_stores";
import { SearchBar } from "~/_components/search-bar";

export const HomeSearch: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const setSearch = useSetAtom($search);

	const [value, setValue] = useState<string>("");

	function _onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		startTransition(() => {
			setValue(e.target.value);
		});
	}

	useEffect(() => {
		// Update debounced value after delay
		const handler = setTimeout(() => setSearch(value), 1000);
		// Cancel the timeout if value changes (also on delay change or unmount)
		// This is how we prevent debounced value from updating if value is changed ...
		// .. within the delay period. Timeout gets cleared and restarted.
		return () => clearTimeout(handler);
	}, [value, setSearch]); // Only re-call effect if value or delay changes

	return <SearchBar value={value} onChange={_onTextChange} containerClass={className} />;
};
