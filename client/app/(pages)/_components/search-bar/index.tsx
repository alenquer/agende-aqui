"use client";
import { useAtom, useSetAtom } from "jotai";
import { startTransition, useEffect, useState } from "react";
import { $page, $search } from "~/(pages)/_stores";
import { SearchBar as DefaultSearchBar } from "~/_components/search-bar";

export const SearchBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const [page, setPage] = useAtom($page);

	const setSearch = useSetAtom($search);

	const [value, setValue] = useState<string>("");

	function _onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		startTransition(() => {
			setValue(e.target.value);
			if (page > 1) setPage(1);
		});
	}

	useEffect(() => {
		// Update debounced value after delay
		const handler = setTimeout(() => {
			setSearch(value);
		}, 1000);
		// Cancel the timeout if value changes (also on delay change or unmount)
		// This is how we prevent debounced value from updating if value is changed ...
		// .. within the delay period. Timeout gets cleared and restarted.
		return () => clearTimeout(handler);
	}, [value, setSearch]); // Only re-call effect if value or delay changes

	return <DefaultSearchBar value={value} onChange={_onTextChange} containerClass={className} />;
};
