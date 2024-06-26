"use client";
import React from "react";
import { Employee } from "@/constants/types";
import { employees } from "@/constants/data";
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

export const ContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [data, setData] = React.useState<Employee[]>(employees);
	const handleSearch = (value: string) => {
		if (value === "") {
			const storedEmployees = localStorage.getItem("employees");
			const savedEmployees = storedEmployees
				? JSON.parse(storedEmployees)
				: employees;
			setData(savedEmployees);
			return;
		}

		const filteredData = data.filter((employee) =>
			employee.name.toLowerCase().includes(value.toLowerCase())
		);
		setData(filteredData);
	};

	const deleteEmployee = (id: number) => {
		const newEmployees = data.filter((employee) => employee.id !== id);
		setData(newEmployees);
		localStorage.setItem("employees", JSON.stringify(newEmployees));
	};

	React.useEffect(() => {
		if (!localStorage.getItem("employees")) {
			localStorage.setItem("employees", JSON.stringify(employees));
			setData(employees);
		} else {
			setData(JSON.parse(localStorage.getItem("employees") as string));
		}
	}, []);

	return (
		<EmployeeContext.Provider
			value={{
				employees: data,
				setEmployees: setData,
				deleteEmployee,
				searchEmployee: handleSearch,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};
