import ProductCard from "@/pages/home/_components/ProductCard";
import type { HomeProduct } from "@/pages/home/service/productsMock";

type ProductsGridProps = {
  products: HomeProduct[];
};

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
