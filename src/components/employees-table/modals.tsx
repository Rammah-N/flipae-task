import { useContext, useState } from "react";
import Modal from "../ui/alert-modal";
import { EmployeeContext } from "@/context/employees";
import { RowData } from "@tanstack/react-table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Employee } from "@/constants/types";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const AssignModal = ({
	isOpen,
	toggle,
	selectedEmployee,
}: {
	isOpen: boolean;
	toggle: () => void;
	selectedEmployee: Employee;
}) => {
	const { setEmployees, employees } = useContext(EmployeeContext);
	const [supervisorId, setSupervisor] = useState<string | null>(null);

	const handleAssign = () => {
		const updatedEmployees = employees.map((employee) => {
			if (supervisorId && employee.id == selectedEmployee.id) {
				employee = {
					...employee,
					supervisor: employees.find(
						(emp) => emp.id == parseInt(supervisorId)
					) as Employee,
				};
			}
			return employee;
		});
		setEmployees(updatedEmployees);
		toggle();
		toast({
			title: "Success",
			description: "Supervisor assigned successfully",
			variant: "success",
		});
	};

	return (
		<Modal
			title="Assign supervisor"
			description="You can assign an employee as a supervisor to this employee."
			isOpen={isOpen}
			onClose={toggle}>
			<div className="flex justify-center">
				<Select onValueChange={(value: string) => setSupervisor(value)}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Assign Supervisor" />
					</SelectTrigger>
					<SelectContent>
						<ScrollArea className="h-[300px]">
							{employees.map((employee) => (
								<SelectItem
									value={`${employee.id}`}
									key={employee.id}
									disabled={selectedEmployee.id == employee.id}>
									{employee.name}{" "}
									{employee.id == selectedEmployee.id && (
										<span className="text-xs">(Selected Employee)</span>
									)}
								</SelectItem>
							))}
						</ScrollArea>
					</SelectContent>
				</Select>
			</div>

			<div className="mt-5 flex justify-center gap-3">
				<Button variant="outline">Cancel</Button>
				<Button onClick={handleAssign}>Assign Supervisor</Button>
			</div>
		</Modal>
	);
};

export const AddEmployeeModal = ({
	isOpen,
	toggle,
}: {
	isOpen: boolean;
	toggle: () => void;
}) => {
	type FormValues = {
		name: string;
		supervisor: string;
		role: string;
	};
	const form = useForm<FormValues>({
		defaultValues: {
			name: "",
			supervisor: "",
			role: "",
		},
	});
	const { handleSubmit, control, reset } = form;
	const { employees, setEmployees } = useContext(EmployeeContext);

	const onSubmit = (data: FormValues) => {
		const newEmployee: Employee = {
			...data,
			supervisor:
				employees.find((emp) => emp.id == parseInt(data.supervisor)) || null,
			id: employees.length + 1,
			createdAt: new Date().toISOString(),
		};
		setEmployees([...employees, newEmployee]);
		localStorage.setItem(
			"employees",
			JSON.stringify([...employees, newEmployee])
		);
		toggle();
		toast({
			title: "Success",
			description: "Employee added successfully",
			variant: "success",
		});
		reset();
	};
	return (
		<Modal
			title="Add supervisor"
			description="You can add a new employee to the company from here"
			isOpen={isOpen}
			onClose={toggle}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form {...form}>
					<div className="grid grid-cols-2 gap-2">
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Employee Fullname</FormLabel>
									<FormControl>
										<Input
											placeholder="Employee Name"
											className="w-full"
											required
											{...field}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="role"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Employee Role</FormLabel>
									<FormControl>
										<Input
											placeholder="Add employee role"
											className="w-full"
											required
											{...field}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="supervisor"
							render={({ field }) => (
								<FormItem className="w-full col-span-2">
									<FormLabel>Assign Supervisor (Optional)</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											required
											defaultValue={`${field.value}`}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Supervisor" />
											</SelectTrigger>
											<SelectContent>
												<ScrollArea className="h-[300px]">
													{employees.map((employee) => (
														<SelectItem
															value={`${employee.id}`}
															key={employee.id}>
															{employee.name}{" "}
															<span className="text-xs text-slate-500">
																({employee.role})
															</span>
														</SelectItem>
													))}
												</ScrollArea>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<div className="mt-5 flex justify-center gap-3">
						<Button variant="outline" onClick={toggle} type="button">
							Cancel
						</Button>
						<Button type="submit">Add Employee</Button>
					</div>
				</Form>
			</form>
		</Modal>
	);
};
