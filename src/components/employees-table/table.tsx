import React, { useContext } from "react";
import { DataTable } from "../ui/data-table";
import { employees } from "@/constants/data";
import { columns } from "./columns";
import { EmployeeContext } from "@/context/employees";
const EmployeeTable = () => {
	const data = useContext(EmployeeContext).employees;
	return (
		<>
			<DataTable
				columns={columns}
				data={data}
				total={employees.length || 0}
				pageCount={Math.ceil(employees.length / 10) || 0}
			/>
		</>
	);
};

export default EmployeeTable;
