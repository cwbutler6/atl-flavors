import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
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
            <h1>Products</h1>
            <CardDescription>
              View product listings
            </CardDescription>
          </div>

          <div className="flex-grow" />

          <div>
            <AddProduct />
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
    </div>
  );
}
