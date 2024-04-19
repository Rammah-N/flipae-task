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
