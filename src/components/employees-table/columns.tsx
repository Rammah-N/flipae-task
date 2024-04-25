import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./actions";
import { Employee } from "@/constants/types";

export const columns: ColumnDef<Employee>[] = [
	{
		header: "Id",
		accessorKey: "id",
	},
	{
		header: "Name",
		accessorKey: "name",
	},
	{
		header: "Role",
		accessorKey: "role",
	},
	{
		accessorKey: "supervisor.name",
		header: "Supervisor",
		cell: ({ row }) =>
			row.original.supervisor ? row.original.supervisor.name : "N/A",
	},
	{
		accessorKey: "createdAt",
		header: "Hire Date",
		cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
