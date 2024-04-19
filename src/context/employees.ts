import React from "react";
import { Employee } from "@/constants/types";
export const EmployeeContext = React.createContext<{
	employees: Employee[];
	setEmployees: (data: Employee[]) => void;
	deleteEmployee: (id: number) => void;
	searchEmployee: (value: string) => void;
}>({
	employees: [],
	setEmployees: (data: Employee[]) => {},
	deleteEmployee: (id: number) => {},
	searchEmployee: (value: string) => {},
});
