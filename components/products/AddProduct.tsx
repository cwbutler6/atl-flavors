"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, updateProduct } from "@/api/product";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button, buttonVariants } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Product } from "@/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ArchiveProductBtn from "./ArchiveProductBtn";
import { productFormSchema } from "./utils";

export default function AddProduct({ product, trigger }: { product?: Product, trigger?: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const title = `${(product) ? "Edit ": "Create "} Product`;
  const description = `${(product) ? "Edit ": "Create new "} product for listing`;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger className={buttonVariants()}>
          {trigger || "Open"}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>

          <AddProductForm product={product} close={close} />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
        <DrawerTrigger>
          {trigger || "Open"}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
          </DrawerHeader>
         
          <div className="p-6">
            <AddProductForm product={product} close={close} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
}

function AddProductForm({ product, close }: { product?: Product, close: () => void }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      status: (product?.status ?? "in stock") as any,
      quantity: product?.quantity ?? 0,
      type: product?.type ?? "flower",
    },
  });

  const onCancel = () => {};
  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    if (product && product.id) {
      await updateProduct(product.id, values);
    } else {
      await createProduct(values);
    }
    router.refresh();
    close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} required>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="flower">🌳</SelectItem>
                  <SelectItem value="mushroom">🍄</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Quantity" {...field} type="number" />
              </FormControl>
              <FormDescription>grams</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="in stock">In Stock</SelectItem>
                  <SelectItem value="out of stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>

          <div className="flex-grow" />

          {product && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" className="mr-2">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete product?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <ArchiveProductBtn
                    id={product.id}
                    onConfirm={close}
                    trigger={<AlertDialogAction>Yes</AlertDialogAction>}
                  />
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button type="submit">
            <PlusCircle className="h-4 w-4 mr-1" />
            {(product) ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
