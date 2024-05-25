import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { DataTable } from "../ui/data-table";
import { fetchCachedProducts } from "@/api/product";
import AddProduct from "./AddProduct";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import { cn } from "@/utils/tailwind";
import "./products.css";

export default async function ProductsList() {
  const products = await fetchCachedProducts();

  return (
    <div className="px-6 w-full">
      <Card className="container mx-auto">
        <CardHeader className="flex-row">
          <div className="flex flex-col">
            <h1 className="text-xl">Products</h1>
            <CardDescription>
              View product listings
            </CardDescription>
          </div>

          <div className="flex-grow" />

          <AddProduct
            trigger={(
              <div className="flex flex-row items-center">
                <PlusCircle size={18} />
                <span className="ml-1">Product</span>
              </div>
            )}
          />
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={products} />
          <div className="grid gap-3 md:hidden">
            {products.map((product) => (
              <AddProduct
                key={product.id}
                product={product}
                trigger={(
                  <Card>
                    <CardHeader className="flex flex-row justify-between p-4">
                      <h1>#{product.id}</h1>
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
                      <small className="text-[10px]">{new Date(product.updated_at || product.created_at).toLocaleString()}</small>
                    </CardFooter>
                  </Card>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
