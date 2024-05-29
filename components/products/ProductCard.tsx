import React from 'react';
import { Product } from '@/types';
import { cn } from '@/utils/tailwind';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between p-4">
        <h1>#{product.id} - {(product.type === "flower") ? "🌳" : "🍄"}</h1>
        <span className={cn(`product-status-${product.status.replace(" ", '-')}`)}>
          {product.status.toLocaleUpperCase()}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl">{product.name}</h1>
        Quantity: {product.quantity}
      </CardContent>
      <CardFooter className="flex flex-row justify-between p-4">
        <small>{product.created_by.full_name || product.created_by.email}</small>
        <small className="text-[10px]">
          {new Date(product.updated_at || product.created_at).toLocaleString()}
        </small>
      </CardFooter>
    </Card>
  )
}
