import { Employee } from "@/constants/types";
import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
	id: string;
	withOpacity?: boolean;
	isDragging?: boolean;
	employee?: Employee;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
	({ id, withOpacity, isDragging, style, employee, ...props }, ref) => {
		const inlineStyles: CSSProperties = {
			transformOrigin: "-100% -100%",
			minWidth: "fit-content",
			backgroundColor: "#fff",
			borderRadius: "10px",
			cursor: isDragging ? "grabbing" : "grab",
			textAlign: "center",
			...style,
		};

		return (
			<div
				ref={ref}
				style={inlineStyles}
				{...props}
				className="shadow-md border-slate-500 border-[1px] rounded-md bg-white touch-none	">
				<div>
					<div className=" py-2 px-1 flex flex-col gap-2 justify-center text-nowrap">
						<span className="text-normal">{employee?.name}</span>
						<span className="text-xs text-slate-500">{employee?.role}</span>
					</div>
				</div>
			</div>
		);
	}
);

Item.displayName = "Item";

export default Item;
