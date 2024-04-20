"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EmployeeContext } from "@/context/employees";
import {
	Active,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	Over,
	useDraggable,
} from "@dnd-kit/core";
import { Employee } from "@/constants/types";
import {
	DndContext,
	closestCenter,
	MouseSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Item from "@/components/item";
import SortableItem from "@/components/sortableItem";
import dynamic from "next/dynamic";

// These two components use document internally, so they need to be loaded dynamically with ssr disabled
const Tree = dynamic(
	() => import("react-organizational-chart").then((m) => m.Tree),
	{
		ssr: false,
	}
);
const TreeNode = dynamic(
	() => import("react-organizational-chart").then((m) => m.TreeNode),
	{
		ssr: false,
	}
);

const StyledNode = ({ employee }: { employee: Employee }) => {
	return (
		<div>
			<div className=" py-2 px-1 flex flex-col gap-2 justify-center border-2 border-primary w-fit mx-auto rounded-md">
				<span>{employee?.name}</span>
				<span className="text-xs text-slate-500">{employee?.role}</span>
			</div>
		</div>
	);
};

function editEmployeesHierarchy(
	items: Employee[],
	active: Active,
	over: Over | null
): Employee[] {
	let newItems = [...items];
	let oldIndex = newItems.findIndex((item) => item.id == active.id);

	let newIndex = newItems.findIndex((item) => item.id == over?.id);

	let oldEmployee = newItems[oldIndex];
	let newEmployee = newItems[newIndex];
	let temp = { ...oldEmployee };
	oldEmployee = { ...newEmployee, name: temp.name };

	newEmployee = { ...temp, name: newEmployee.name };

	newItems[oldIndex] = newEmployee;
	newItems[newIndex] = oldEmployee;
	return newItems;
}

const Page = () => {
	const { employees, setEmployees } = useContext(EmployeeContext);
	const sensors = useSensors(useSensor(MouseSensor));
	const [activeId, setActiveId] = useState<number | null>(null);
	const handleDragStart = useCallback((event: DragStartEvent) => {
		const id: number = event.active.id as number;
		setActiveId(id);
	}, []);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (active.id !== over?.id) {
				setEmployees(editEmployeesHierarchy(employees, active, over));
			}

			setActiveId(null);
		},
		[setEmployees, employees]
	);

	const handleDragCancel = useCallback(() => {
		setActiveId(null);
	}, []);

	const renderTree = (employee: Employee, renderedEmployees: number[] = []) => {
		if (renderedEmployees.includes(employee.id)) {
			// Employee already rendered as a child, don't render again as a main node
			return null;
		}

		// Add the current employee to the list of rendered employees
		renderedEmployees.push(employee.id);

		if (employee.supervising?.length) {
			return (
				<TreeNode
					key={employee.id}
					label={
						<SortableItem
							id={employee.id.toString()}
							key={employee.id}
							employee={employee}
						/>
					}>
					{employee.supervising.map((id) => {
						const emp = employees.find((e) => e.id === id);
						if (emp) {
							return renderTree(emp, renderedEmployees);
						}
					})}
				</TreeNode>
			);
		} else {
			return (
				<TreeNode
					key={employee.id}
					label={
						<SortableItem
							id={employee.id.toString()}
							key={employee.id}
							employee={employee}
						/>
					}
				/>
			);
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}>
			<div className="min-h-screen py-5">
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
							<BreadcrumbPage>Employee Hierarchy</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className="text-2xl font-medium mt-5 mb-1">Employees Hierarchy</h1>
				<p className="text-gray-500">
					Here you can view and edit the employee hierarchy (drag and drop items
					to change supervisors)
				</p>
				<TransformWrapper
					initialScale={0.8}
					minScale={0.5}
					maxScale={1.5}
					limitToBounds={false}
					centerOnInit
					disabled={!!activeId}
					smooth>
					<TransformComponent>
						<div className="flex-1 mt-10">
							{employees?.length > 0 && (
								<Tree
									lineWidth={"2px"}
									lineColor={"green"}
									lineBorderRadius={"10px"}
									label={
										<StyledNode
											employee={employees.find((emp) => emp.isCeo) as Employee}
										/>
									}>
									<SortableContext
										items={employees}
										strategy={rectSortingStrategy}>
										{employees
											.filter(
												(emp) =>
													emp.supervising &&
													!employees.find(
														(sup) => sup.id === emp.supervisor?.id
													)?.supervising
											)
											.map((emp) => renderTree(emp))}
									</SortableContext>
								</Tree>
							)}
						</div>
					</TransformComponent>
				</TransformWrapper>
			</div>
			<DragOverlay key="drag-overlay">
				{activeId ? (
					<Item
						id={activeId.toString()}
						employee={employees.find((emp) => emp.id == activeId)}
						isDragging
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default Page;
