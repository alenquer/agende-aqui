"use client";
import { useAtom, useAtomValue } from "jotai";
import { $page, $services } from "~/(pages)/_stores";
import { Paginate as DefaultPaginate } from "~/_components/paginate";

export const Paginate: React.FC = () => {
	const [page, setPage] = useAtom($page);

	const { data, isFetched } = useAtomValue($services);

	return !isFetched || !data.count ? null : (
		<DefaultPaginate currentPage={page} itemsPerPage={8} onPageChange={setPage} totalItems={data.count} />
	);
};
