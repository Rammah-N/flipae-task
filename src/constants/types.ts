import { AccordionItemProps } from "@radix-ui/react-accordion";
import React, { Dispatch, SetStateAction } from "react";

export interface Employee {
	id: number;
	name: string;
	supervisor: {
		id: number;
		name: string;
	} | null;
	role: string;
	isCeo?: boolean;
	supervising?: number[];
	createdAt: string;
}

interface NavItemWithOptionalChildren {
	title: string;
	items?: {
		title: string;
		href: string;
	}[];
}

export interface DashboardNavProps {
	items: NavItemWithOptionalChildren[];
	setOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface DropdownNavProps extends AccordionItemProps {
	item: NavItemWithOptionalChildren;
	path: string;
	icon: React.ReactNode;
}
