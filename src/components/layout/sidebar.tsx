"use client";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Menu, Users } from "lucide-react";
import { Button } from "../ui/button";

const NavItem = ({
	children,
	icon,
	href,
}: {
	children: React.ReactNode;
	icon: React.ReactNode;
	href: string;
}) => {
	return (
		<Link
			href={href}
			className="flex items-center gap-2 transition-colors border-[1px] border-primary py-2 px-3 rounded-md text-primary pr-2">
			{icon}
			<span className="text-sm font-medium">{children}</span>
		</Link>
	);
};

const DropdownNav: React.FC<DropdownNavProps> = ({
	item,
	path,
	icon,
	...rest
}) => {
	return (
		<Accordion type="single" collapsible defaultValue="open">
			<AccordionItem {...rest} className="border-b-0">
				<AccordionTrigger
					className={cn(
						"transition-colors border-[1px] border-primary py-0 rounded-md text-primary pr-2 "
					)}
					disabled={!item.items}>
					<span
						className={cn(
							"group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium "
						)}>
						{icon}
						<span>{item.title}</span>
					</span>
				</AccordionTrigger>
				<AccordionContent className="flex flex-col px-10 pt-2">
					{item.items?.map((subItem, index) => (
						<Link
							key={index}
							href={subItem.href as string}
							className={cn(
								"py-2 border-l-[1px] border-dark-gray pl-2 transition-colors",
								path.includes(subItem.href as string) && "border-primary"
							)}>
							{subItem.title}
						</Link>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

const MobileNav = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="lg:hidden fixed top-5 right-10 z-[999]">
			<Button onClick={() => setOpen((prev) => !prev)}>
				<Menu className="w-5" />
			</Button>
			{open && (
				<nav className="bg-white px-2 py-3 absolute top-10 right-0 rounded-md">
					<ul className="flex flex-col gap-5">
						<NavItem icon={<Home className="w-5" />} href="/">
							Home
						</NavItem>
						<DropdownNav
							item={{
								title: "Employees",
								items: [
									{ title: "List", href: "/employees" },
									{ title: "Hierarchy", href: "/hierarchy" },
								],
							}}
							path="/"
							value="Employees"
							icon={<Users className="w-5" />}
						/>
					</ul>
				</nav>
			)}
		</div>
	);
};

const Sidebar = () => {
	return (
		<>
			{/* Desktop Nav */}
			<nav className="bg-white w-[200px] rounded-md px-5 py-5 h-calc(100vh-50) shadow-md hidden lg:block">
				<ul className="flex flex-col gap-5">
					<NavItem icon={<Home className="w-5" />} href="/">
						Home
					</NavItem>
					<DropdownNav
						item={{
							title: "Employees",
							items: [
								{ title: "List", href: "/employees" },
								{ title: "Hierarchy", href: "/hierarchy" },
							],
						}}
						path="/"
						value="Employees"
						icon={<Users className="w-5" />}
					/>
				</ul>
			</nav>
			<MobileNav />
		</>
	);
};

export default Sidebar;
