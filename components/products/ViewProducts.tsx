import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { DataTable } from "../ui/data-table";
import { fetchCachedProducts } from "@/api/product";
import AddProduct from "./AddProduct";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import ProductCard from "./ProductCard";
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
                trigger={<ProductCard product={product} />}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
