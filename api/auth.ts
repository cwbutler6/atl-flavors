
"use server";

import { User } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

export const createUser = async ({ full_name, email, password }: { full_name: string, email: string, password: string }) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });

  if (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

export async function fetchUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles")
    .select("*")
    .order("full_name", { ascending: true })
    .returns<User[]>();

  if (error) {
    console.error("Error fetching users", error);
    throw error;
  }

  return data;
}

export const fetchCachedUsers = cache(fetchUsers);
