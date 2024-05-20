import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function useProtected() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  console.log(user)

  try {
  if (!user) {
    return redirect("/login");
  }
} catch (error) {
  console.error(error)
}
}
