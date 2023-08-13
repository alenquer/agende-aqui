"use client";
import { useAtom, useStore } from "jotai";
import { $page } from "~/(routes)/_stores";
import { Paginate as DefaultPaginate } from "~/_components/paginate";

export const Paginate: React.FC = () => {
	const store = useStore();

	const [page, setPage] = useAtom($page, { store });

	return <DefaultPaginate currentPage={page} itemsPerPage={6} onPageChange={setPage} totalItems={1} />;
};
