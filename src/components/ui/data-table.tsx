"use client";
import {
	ColumnDef,
	PaginationState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchKey: string;
	pageNo?: number;
	total?: number;
	pageSizeOptions?: number[];
	pageCount?: number;
	searchParams?: {
		[key: string]: string | string[] | undefined;
	};
	loading?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	total,
	pageCount,
	pageSizeOptions = [10, 20, 30, 40, 50],
	loading,
}: DataTableProps<TData, TValue>) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Search params
	const page = searchParams?.get("page") ?? "1";
	const pageAsNumber = Number(page);
	const fallbackPage =
		isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
	const per_page = searchParams?.get("limit") ?? "10";
	const perPageAsNumber = Number(per_page);
	const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

	// Create query string
	const createQueryString = React.useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (
					value === null ||
					value === "all" ||
					(key === "page" && value === 1) ||
					(key === "limit" && value === 10)
				) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, String(value));
				}
			}

			return newSearchParams.toString();
		},
		[searchParams]
	);

	// Handle server-side pagination
	const [{ pageIndex, pageSize }, setPagination] =
		React.useState<PaginationState>({
			pageIndex: fallbackPage - 1,
			pageSize: fallbackPerPage,
		});

	React.useEffect(() => {
		router.push(
			`${pathname}?${createQueryString({
				page: pageIndex + 1,
				limit: pageSize,
			})}`,
			{
				scroll: false,
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageIndex, pageSize]);

	const table = useReactTable({
		data,
		columns,

		pageCount: total ? Math.ceil(total / pageSize) : pageCount,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination: { pageIndex, pageSize },
		},
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
		manualFiltering: true,
	});

	return (
		<>
			<ScrollArea className="rounded-md border h-[calc(80vh-100px)]">
				<Table className="relative">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="whitespace-nowrap">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-full text-center">
									<Loader2 className="mt-10 w-10 h-10 animate-spin repeat-infinite" />
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			<div className="flex flex-col gap-2 sm:flex-row items-center justify-end space-x-2 py-4">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-3 flex-1 text-sm text-muted-foreground">
						<span>
							Total: {table.getFilteredRowModel().rows.length} Employee(s)
						</span>
					</div>
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
						<div className="flex items-center space-x-2">
							<p className="whitespace-nowrap text-sm font-medium">
								Rows per page
							</p>
							<Select
								value={`${table.getState().pagination.pageSize}`}
								onValueChange={(value) => {
									table.setPageSize(Number(value));
								}}>
								<SelectTrigger className="h-8 w-[70px]">
									<SelectValue
										placeholder={table.getState().pagination.pageSize}
									/>
								</SelectTrigger>
								<SelectContent side="top">
									{pageSizeOptions.map((pageSize) => (
										<SelectItem key={pageSize} value={`${pageSize}`}>
											{pageSize}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between sm:justify-end gap-2 w-full">
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{total && Math.ceil(total / pageSize)}
					</div>
					<div className="flex items-center space-x-2">
						<Button
							aria-label="Go to first page"
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}>
							<ArrowBigLeft className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							aria-label="Go to previous page"
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							<ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							aria-label="Go to next page"
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							<ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							aria-label="Go to last page"
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}>
							<ArrowBigRight className="h-4 w-4" aria-hidden="true" />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
