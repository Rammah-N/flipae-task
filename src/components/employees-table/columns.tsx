import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./actions";
import { cn } from "@/lib/utils";
import {
	AlarmClock,
	BookLock,
	CheckSquare,
	SearchCheck,
	UserCheck,
	XSquare,
} from "lucide-react";
import { Employee } from "@/constants/types";
import { Checkbox } from "../ui/checkbox";

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
		accessorKey: "supervisor.name",
		header: "Supervisor",
		cell: ({ row }) =>
			row.original.supervisor ? row.original.supervisor.name : "N/A",
	},
	{
		accessorKey: "createdAt",
		header: "Application Date",
		cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
	},
	{
		accessorKey: "updatedAt",
		header: "Last Updated",
		cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
