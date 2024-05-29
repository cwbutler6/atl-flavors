"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "../ui/button";
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Product } from "@/types";import { useState } from "react";
import ProductForm from "./ProductForm";

export default function AddProduct({ product, trigger }: { product?: Product, trigger?: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const title = `${(product) ? "Edit ": "Create "} Product`;
  const description = `${(product) ? "Edit ": "Create new "} product for listing`;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger className={buttonVariants()}>
          {trigger || "Open"}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>

          <ProductForm product={product} close={close} />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
        <DrawerTrigger>
          {trigger || "Open"}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
          </DrawerHeader>
         
          <div className="p-6">
            <ProductForm product={product} close={close} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
}


