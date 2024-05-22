"use server";

import { Product } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export async function fetchProducts() {
  const supabase = createClient();
  const { data, error } = await supabase.from("products")
    .select("*, created_by(full_name, email)")
    .neq("status", "archived")
    .order("name", { ascending: true })
    .returns<Product[]>();

  if (error) {
    console.error("Error fetching products", error);
    throw error;
  }

  return data;
}

export const fetchCachedProducts = cache(fetchProducts);

export async function createProduct(product: FormData) {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .insert({
      name: product.get("name") as string,
      status: product.get("status"),
      quantity: product.get("quantity"),
    });

  if (error) {
    console.error("Error creating product", error);
    throw error;
  }

  return product;
}
