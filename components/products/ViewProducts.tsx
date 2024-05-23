import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { DataTable } from "../ui/data-table";
import { fetchCachedProducts } from "@/api/product";
import AddProduct from "./AddProduct";
import { columns } from "./columns";

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

          <AddProduct />
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={products} />
          <div className="grid gap-3 md:hidden">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="flex flex-row justify-end p-4">
                  {product.status.toLocaleUpperCase()}
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
