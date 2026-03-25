import ProductsDataGrid from "@/pages/products/_components/ProductsDataGrid";
import { productsMock } from "@/pages/products/service/productsMock";

export default function Products() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Produtos</h1>

      <ProductsDataGrid initialData={productsMock} />
    </section>
  );
}
