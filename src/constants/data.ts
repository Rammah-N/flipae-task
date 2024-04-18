import { Employee } from "./types";

export const employees: Employee[] = [
	{
		id: 1,
		name: "John Doe",
		supervisorId: null,
	},
	{
		id: 2,
		name: "Jane Doe",
		supervisorId: 1,
	},
	{
		id: 3,
		name: "John Smith",
		supervisorId: 1,
	},
	{
		id: 4,
		name: "Jane Smith",
		supervisorId: 1,
	},
	{
		id: 5,
		name: "John Doe Jr",
		supervisorId: 2,
	},
	{
		id: 6,
		name: "Jane Doe Jr",
		supervisorId: 2,
	},
	{
		id: 7,
		name: "John Smith Jr",
		supervisorId: 3,
	},
	{
		id: 8,
		name: "Jane Smith Jr",
		supervisorId: 3,
	},
	{
		id: 9,
		name: "John Doe III",
		supervisorId: 5,
	},
	{
		id: 10,
		name: "Jane Doe III",
		supervisorId: 5,
	},
];
