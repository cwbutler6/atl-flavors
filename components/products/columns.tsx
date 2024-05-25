"use client";

import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Archive, MoreHorizontal, Pencil } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import ArchiveProductBtn from "./ArchiveProductBtn";
import AddProduct from "./AddProduct";

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
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-x-4">
          <AddProduct
            product={row.original}
            trigger={<div className="flex flex-row"><Pencil size={16} /></div>}
          />
          <ArchiveProductBtn
            id={row.original.id}
            trigger={<Archive size={16} />}
          />
        </div>
      )
    },
  }
];
