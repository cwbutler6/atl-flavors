"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { createUser } from "@/api/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  full_name: z.string({ required_error: "User's name is required" }),
  email: z.string({ required_error: "User's email is required" }).email(),
  password: z.string({ required_error: "User's password is required" }).min(6),
});

export default function AddUser() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        <PlusCircle className="h-4 w-4 mr-1" />
        Add User
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Create new user
          </DialogDescription>
        </DialogHeader>

        <AddUserForm />
      </DialogContent>
    </Dialog>
  );
}

function AddUserForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { full_name: "", email: "" },
  });

  const onCancel = () => {};
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createUser(values);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="User name" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@email.com" {...field} type="email" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" required />
              </FormControl>
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
            Add User
          </Button>
        </div>
      </form>
    </Form>
  );
}
