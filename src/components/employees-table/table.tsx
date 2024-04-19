import React, { useContext } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { EmployeeContext } from "@/context/employees";
const EmployeeTable = () => {
	const { employees } = useContext(EmployeeContext);
	return (
		<>
			<DataTable
				columns={columns}
				data={employees}
				total={employees.length || 0}
			/>
		</>
	);
};

export default EmployeeTable;
