"use client";
import React, { useContext } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { EmployeeContext } from "@/context/employees";

export type Filter = {
	name: string;
	label: string;
	options: {
		label: string;
		value: string;
	}[];
};

const Search = () => {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const handleSearch = useContext(EmployeeContext).searchEmployee;

	const clear = () => {
		const params = new URLSearchParams(searchParams);
		params.delete("search");

		replace(`${pathname}?${params.toString()}`);
	};
	return (
		<div className="flex justify-between items-center mb-5 ">
			<div className="flex items-center gap-5  w-full">
				<div className="flex justify-between items-center relative max-w-fit w-full">
					<Input
						type="text"
						placeholder="Search using employee name"
						className="w-[320px]"
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<Button variant={null} className="absolute right-3 px-0">
						<SearchIcon />
					</Button>
				</div>

				{/* Create clear button */}
				{searchParams.get("search") && (
					<Button variant={null} className="p-0" onClick={() => clear()}>
						Clear
					</Button>
				)}
			</div>
		</div>
	);
};

export default Search;
