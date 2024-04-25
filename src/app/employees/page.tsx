"use client";
import React, { Suspense, useEffect, useState } from "react";
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
import { EmployeeContext } from "@/context/employees";
import { AddEmployeeModal } from "@/components/employees-table/modals";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
	const [openAdd, setOpenAdd] = useState(false);
	const { setEmployees } = React.useContext(EmployeeContext);

	return (
		<div className="max-w-full overflow-x-hidden">
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
			<div className="flex flex-col md:flex-row justify-between items-start mb-5 md:mb-0 md:items-center">
				<h1 className="text-2xl font-medium py-5">Employees List</h1>
				<Button
					className="flex items-center gap-2"
					onClick={() => setOpenAdd(true)}>
					<UserPlus />
					Add Employee
				</Button>
			</div>
			<div className="flex justify-between flex-col items-start md:flex-row md:items-center">
				<Suspense>
					<Search />
				</Suspense>
				<Button
					variant={null}
					onClick={() => {
						setEmployees(employees);
						localStorage.setItem("employees", JSON.stringify(employees));
						toast({
							title: "Data Reset",
							description: "Employee data has been reset",
						});
					}}>
					Reset Data
				</Button>
			</div>
			<Suspense fallback="loading...">
				<EmployeeTable />
			</Suspense>
			<AddEmployeeModal isOpen={openAdd} toggle={() => setOpenAdd(false)} />
		</div>
	);
};

export default Page;
