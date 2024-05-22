"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleClick() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <Button onClick={handleClick}>
      Log out
    </Button>
  );
}
