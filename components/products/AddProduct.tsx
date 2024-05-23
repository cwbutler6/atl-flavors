"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/api/product";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button, buttonVariants } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

const formSchema = z.object({
  name: z.string({ required_error: "Product name is required" }),
  status: z.enum(["in stock", "out of stock"]),
  quantity: z.number().min(0),
});

export default function AddProduct() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className={buttonVariants()}>
          <PlusCircle className="h-4 w-4 mr-1" />
          Product
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-2">
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Create new product for listing
            </DialogDescription>
          </DialogHeader>

          <AddProductForm />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer>
        <DrawerTrigger className={buttonVariants()}>
          <PlusCircle className="h-4 w-4 mr-1" />
          Product
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Product</DrawerTitle>
            <DrawerDescription>
              Create new product for listing
            </DrawerDescription>
          </DrawerHeader>
         
         <div className="p-6">
          <AddProductForm />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
}

function AddProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", status: "in stock", quantity: 0 },
  });

  const onCancel = () => {};
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("status", values.status);
    formData.append("quantity", values.quantity.toString());
    await createProduct(formData);
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

        <div className="flex flex-row justify-between mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
