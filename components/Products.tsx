import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { DataTable } from "./ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";
import { fetchCachedProducts } from "@/api/product";

export const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "created_by", header: "Created By" },
  { accessorKey: "updated_at", header: "Last Updated" },
];

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
            <Button>
              Add Product
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
    </div>
  );
}
