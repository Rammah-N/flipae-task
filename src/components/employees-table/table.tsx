"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { DataTable } from "../ui/data-table";
import { employees } from "@/constants/data";
import { columns } from "./columns";
import Search from "../search";
const EmployeeTable = () => {
	const searchParams = useSearchParams();
	const [data, setData] = useState(employees);

	const handleSearch = (value: string) => {
		if (value === "") {
			setData(employees);
			return;
		}

		const filteredData = employees.filter((employee) =>
			employee.name.toLowerCase().includes(value.toLowerCase())
		);
		setData(filteredData);
	};
	return (
		<>
			<Search handleSearch={handleSearch} />

			<DataTable
				searchKey="company"
				//ts-ignore
				columns={columns}
				data={data}
				total={employees.length || 0}
				pageCount={Math.ceil(employees.length / 10) || 0}
			/>
		</>
	);
};

export default EmployeeTable;
