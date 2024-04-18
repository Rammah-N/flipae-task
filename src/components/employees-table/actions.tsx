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
import { useState } from "react";
import Link from "next/link";

import { useMultipleToggles } from "@/hooks";
import { toast } from "@/components/ui/use-toast";

interface CellActionProps {
	data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
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
		</>
	);
};
