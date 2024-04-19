"use client";
import React, { useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EmployeeTable from "@/components/employees-table/table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { employees } from "@/constants/data";
import Search from "@/components/search";
import { Employee } from "@/constants/types";
import { EmployeeContext } from "@/context/employees";

const Page = () => {
	const savedEmployees = localStorage.getItem("employees")
		? JSON.parse(localStorage.getItem("employees") as string)
		: employees;
	const [data, setData] = useState<Employee[]>(savedEmployees);

	const handleSearch = (value: string) => {
		if (value === "") {
			setData(savedEmployees);
			return;
		}

		const filteredData = employees.filter((employee) =>
			employee.name.toLowerCase().includes(value.toLowerCase())
		);
		setData(filteredData);
	};
	const contextValue = {
		employees: data,
		setEmployees: setData,
		deleteEmployee: (id: number) => {
			const newEmployees = data.filter((employee) => employee.id !== id);
			setData(newEmployees);
			localStorage.setItem("employees", JSON.stringify(newEmployees));
		},
		searchEmployee: handleSearch,
	};
	return (
		<EmployeeContext.Provider value={contextValue}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Employees</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Employee List</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium py-5">Employees List</h1>
				<Button className="flex items-center gap-2">
					<UserPlus />
					Add Employee
				</Button>
			</div>
			<div className="flex justify-between items-center">
				<Search />
				<Button
					variant={null}
					onClick={() => {
						setData(employees);
						localStorage.setItem("employees", JSON.stringify(employees));
					}}>
					Reset Data
				</Button>
			</div>
			<EmployeeTable />
		</EmployeeContext.Provider>
	);
};

export default Page;
