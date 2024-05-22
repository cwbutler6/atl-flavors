"use client";

import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Archive, MoreHorizontal, Pencil } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "created_by", header: "Created By", cell: ({ row }) =>  row.original.created_by.full_name || row.original.created_by.email },
  { 
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => (row.original.updated_at) ? new Date(row.original.updated_at).toLocaleString() : null,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil size={14} className="mr-2"/> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
            <AlertDialog>
              <AlertDialogTrigger className="flex flex-row items-center">
                <Archive size={14} className="mr-2" /> Archive
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to archive {row.original.name}?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className={buttonVariants({ variant: "destructive" })}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }
];
