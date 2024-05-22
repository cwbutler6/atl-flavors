import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function useProtected() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return redirect("/login");
  }
}
