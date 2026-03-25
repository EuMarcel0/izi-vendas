import ProductsDataGrid from "@/pages/products/_components/ProductsDataGrid";
import { productsMock } from "@/pages/products/service/productsMock";

export default function Products() {
  return (
    <section className="p-5">
      <ProductsDataGrid initialData={productsMock} />
    </section>
  );
}
