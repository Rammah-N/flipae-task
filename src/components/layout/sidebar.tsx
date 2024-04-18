import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItemProps } from "@radix-ui/react-accordion";
import { DropdownNavProps } from "@/constants/types";
import { cn } from "@/lib/utils";

const NavItem = ({
	children,
	icon,
}: {
	children: React.ReactNode;
	icon: React.ReactNode;
}) => {
	return (
		<li className="flex items-center justify-center gap-2">
			<i className="w-5 h-5">{icon}</i>
			{children}
		</li>
	);
};

const DropdownNav: React.FC<DropdownNavProps> = ({ item, path, ...rest }) => {
	const Icon = Icons[item.icon || "arrowRight"];
	const currentOpen = path.includes(item.href as string) ? "open" : "closed";
	return (
		<Accordion type="single" collapsible defaultValue="open">
			<AccordionItem {...rest} className="border-b-0" value={currentOpen}>
				<AccordionTrigger
					className={cn(
						"border-transparent transition-colors border-[1px] hover:border-gold py-0 rounded-md text-white pr-2 !outline-none hover:!outline-none",
						item.href && path.includes(item.href)
							? "border-gold"
							: "border-transparent"
					)}>
					<span
						className={cn(
							"group flex items-center rounded-md px-3 py-2 text-sm font-medium ",
							item.disabled && "cursor-not-allowed opacity-80"
						)}>
						<Icon className="mr-2 h-4 w-4 text-white" />
						<span className="text-white">{item.title}</span>
					</span>
				</AccordionTrigger>
				<AccordionContent className="flex flex-col px-10 pt-2">
					{item.items?.map((subItem, index) => (
						<Link
							key={index}
							href={subItem.href as string}
							className={cn(
								"text-white py-2 border-l-[1px] border-dark-gray pl-2 hover:border-gold transition-colors",
								path.includes(subItem.href as string) && "border-gold"
							)}>
							{subItem.title}
						</Link>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

const Sidebar = () => {
	return (
		<nav>
			<ul>
				<li>Home</li>
				<li>Employees</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
