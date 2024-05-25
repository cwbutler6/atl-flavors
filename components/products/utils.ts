import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string({ required_error: "Product name is required" }),
  status: z.enum(["in stock", "out of stock", "archived"]),
  quantity: z.number().min(0),
});

export type ProductInput = z.infer<typeof productFormSchema>;
