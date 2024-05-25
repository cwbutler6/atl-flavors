"use server";

import { ProductInput } from "@/components/products/utils";
import { Product } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export async function fetchProducts() {
  const supabase = createClient();
  const { data, error } = await supabase.from("products")
    .select("*, created_by(full_name, email)")
    .neq("status", "archived")
    .order("id", { ascending: true })
    .returns<Product[]>();

  if (error) {
    console.error("Error fetching products", error);
    throw error;
  }

  return data;
}

export const fetchCachedProducts = cache(fetchProducts);

export async function createProduct(product: ProductInput) {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .insert(product);

  if (error) {
    console.error("Error creating product", error);
    throw error;
  }

  return product;
}

export async function updateProduct(id: number, product: Partial<ProductInput>) {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id);

  if (error) {
    console.error("Error updating product", error);
    throw error;
  }

  return id;
}

export async function archiveProduct(id: number) {
  console.log(id)
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .update({ status: "archived" })
    .eq("id", id);
  if (error) {
    console.error("Error archiving product", error);
    throw error;
  }

  return id;
}
