"use client";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { productFormSchema } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProduct, updateProduct } from "@/api/product";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DialogClose } from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import ArchiveProductBtn from "./ArchiveProductBtn";
import { AlertDialogAction } from "../ui/alert-dialog";
import { Archive, PlusCircle } from "lucide-react";
import { cn } from "@/utils/tailwind";

export default function ProductForm(
  { product, close }:
  { product?: Product, close: () => void }
) {
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
    <FormProvider {...form}>
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
                <Input placeholder="Quantity" type="number" {...field} />
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
            <Button type="button" onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <div className="flex-grow" />

          {product && (
            <ArchiveProductBtn
              id={product.id}
              onConfirm={close}
              trigger={(
                <AlertDialogAction className={cn("mr-2", buttonVariants({ variant: "destructive" }))}>
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </AlertDialogAction>
              )}
            />
          )}
          <Button type="submit">
            <PlusCircle className="h-4 w-4 mr-1" />
            {(product) ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}