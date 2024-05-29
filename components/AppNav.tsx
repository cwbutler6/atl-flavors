"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/utils/tailwind";
import LogoutButton from "./buttons/Logout";
import { Menu as MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const Link = ({ href, ...props }: any) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return <NextLink href={href} className={cn(navigationMenuTriggerStyle(), "mx-1", isActive && "underline underline-offset-[3px]")} {...props} />;
};

export default function AppNav() {
  return (
    <>
      <div className="hidden md:flex">
        <AppNavMenu />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <MenuIcon size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent>
        <div className={cn("flex gap-3", "flex-col")}>
          <SheetClose asChild><Link href="/">Products</Link></SheetClose>
          <SheetClose asChild><Link href="/transactions">Transactions</Link></SheetClose>
          <div className="text-center">
            <SheetClose asChild><LogoutButton /></SheetClose>
          </div>
        </div>
        </SheetContent>
      </Sheet>
    </>
  );
  
}

export function AppNavMenu({ vertical }: { vertical?: boolean }) {
  return (
    <div className={cn("flex gap-3", (vertical) ? "flex-col" : "flex-row items-center")}>
      <Link href="/">Products</Link>
      <Link href="/transactions">Transactions</Link>
      <div className="text-center">
        <LogoutButton />
      </div>
    </div>
  );
}
