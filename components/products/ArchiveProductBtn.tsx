"use client";

import { archiveProduct } from "@/api/product";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";

export default function ArchiveProductBtn(
  { trigger, id, asChild, onConfirm }:
  { trigger?: React.ReactNode, id: number, asChild?: boolean; onConfirm?: () => void }
) {
  const router = useRouter();
  const onDelete = () => async () => {
    await archiveProduct(id);
    router.refresh();
    onConfirm?.();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete product?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete()} className={buttonVariants({ variant: "destructive" })}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
