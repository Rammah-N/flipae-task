import React from "react";
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
import Search from "@/components/search";

const Page = () => {
	return (
		<>
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
			<EmployeeTable />
		</>
	);
};

export default Page;
