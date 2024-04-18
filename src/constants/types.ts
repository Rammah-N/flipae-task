import { AccordionItemProps } from "@radix-ui/react-accordion";
import { Dispatch, SetStateAction } from "react";

export interface Employee {
	id: number;
	name: string;
	supervisorId: number | null;
}

export interface DashboardNavProps {
	items: string[];
	setOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface DropdownNavProps extends AccordionItemProps {
	item: string[];
	path: string;
}
