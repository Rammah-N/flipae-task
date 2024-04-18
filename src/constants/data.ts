import { Employee } from "./types";

export const employees: Employee[] = [
	{
		id: 1,
		name: "John Doe",
		supervisor: null,
		createdAt: "2024-04-18T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 2,
		name: "Alice Smith",
		supervisor: {
			id: 1,
			name: "John Doe",
		},
		createdAt: "2024-04-17T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 3,
		name: "Bob Johnson",
		supervisor: {
			id: 1,
			name: "John Doe",
		},
		createdAt: "2024-04-16T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 4,
		name: "Emma Brown",
		supervisor: {
			id: 3,
			name: "Bob Johnson",
		},
		createdAt: "2024-04-15T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 5,
		name: "Michael Lee",
		supervisor: null,
		createdAt: "2024-04-14T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 6,
		name: "Jennifer Garcia",
		supervisor: null,
		createdAt: "2024-04-13T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 7,
		name: "William Martinez",
		supervisor: {
			id: 2,
			name: "Alice Smith",
		},
		createdAt: "2024-04-12T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 8,
		name: "Sophia Rodriguez",
		supervisor: null,
		createdAt: "2024-04-11T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 9,
		name: "Matthew Wilson",
		supervisor: {
			id: 5,
			name: "Michael Lee",
		},
		createdAt: "2024-04-10T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 10,
		name: "Olivia Martinez",
		supervisor: {
			id: 2,
			name: "Alice Smith",
		},
		createdAt: "2024-04-09T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 11,
		name: "Ethan Thomas",
		supervisor: {
			id: 3,
			name: "Bob Johnson",
		},
		createdAt: "2024-04-08T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 12,
		name: "Ava White",
		supervisor: null,
		createdAt: "2024-04-07T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 13,
		name: "James Harris",
		supervisor: {
			id: 7,
			name: "William Martinez",
		},
		createdAt: "2024-04-06T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 14,
		name: "Charlotte King",
		supervisor: {
			id: 5,
			name: "Michael Lee",
		},
		createdAt: "2024-04-05T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 15,
		name: "Logan Taylor",
		supervisor: null,
		createdAt: "2024-04-04T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 16,
		name: "Mia Hernandez",
		supervisor: {
			id: 4,
			name: "Emma Brown",
		},
		createdAt: "2024-04-03T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 17,
		name: "Benjamin Nguyen",
		supervisor: {
			id: 1,
			name: "John Doe",
		},
		createdAt: "2024-04-02T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 18,
		name: "Lily Brown",
		supervisor: {
			id: 2,
			name: "Alice Smith",
		},
		createdAt: "2024-04-01T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
	{
		id: 19,
		name: "Jacob Patel",
		supervisor: null,
		createdAt: "2024-03-31T08:00:00.000Z",
		updatedAt: "2024-04-18T08:00:00.000Z",
	},
];
