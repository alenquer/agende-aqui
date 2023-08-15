"use client";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export const BackButton: React.FC = () => {
	const router = useRouter();

	function _handleBack() {
		router.back();
	}

	return (
		<button onClick={_handleBack} className={twMerge("hover:opacity-50", "w-max")}>
			<IoArrowBackCircleSharp color="#6E66DD" size={24} />
		</button>
	);
};
