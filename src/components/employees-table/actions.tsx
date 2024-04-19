"use client";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Archive,
	BadgeCheck,
	BookPlus,
	BookText,
	BookUser,
	MoreHorizontal,
	MoveDiagonal,
	Trash,
	UserCheck,
	UserPlus,
	UserX,
} from "lucide-react";
import { useContext, useState } from "react";
import Link from "next/link";

import { useMultipleToggles } from "@/hooks";
import { toast } from "@/components/ui/use-toast";
import { EmployeeContext } from "@/context/employees";
import { AssignModal } from "./modals";
import { Employee } from "@/constants/types";

interface CellActionProps {
	data: Employee;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const deleteEmployee = useContext(EmployeeContext).deleteEmployee;
	const { toggleState, activeState } = useMultipleToggles([
		"delete",
		"archive",
		"attach",
		"stage",
		"assign",
		"rejection",
		"reference",
		"logs",
	]);

	const handleDelete = () => {
		deleteEmployee(data.id);
		toggleState("delete");
		toast({
			title: "Successful",
			description: `Employee ${data.name} has been deleted successfully`,
			variant: "success",
		});
	};

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Employee Actions</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() => toggleState("assign")}
						className="cursor-pointer">
						<UserPlus className="mr-2 h-4 w-4" /> Assign Supervisor
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => toggleState("delete")}
						className="text-destructive cursor-pointer focus:text-destructive">
						<Trash className="mr-2 h-4 w-4 " /> Delete Employee
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertModal
				title="Delete Employee"
				description="Caution: this action is irreversible"
				isOpen={activeState.delete}
				onClose={() => toggleState("delete")}>
				<p>Are you sure you want to delete this employee?</p>
				<div className="flex justify-center gap-3 mt-2">
					<Button variant="outline" onClick={() => toggleState("delete")}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</AlertModal>
			<AssignModal
				isOpen={activeState.assign}
				toggle={() => toggleState("assign")}
				selectedEmployee={data}
			/>
		</>
	);
};
