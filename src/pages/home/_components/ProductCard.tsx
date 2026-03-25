import { ShoppingCartSimple, Star } from "@phosphor-icons/react";

import type { HomeProduct } from "@/pages/home/service/productsMock";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: HomeProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`relative flex h-48 items-end overflow-hidden bg-linear-to-br ${product.gradientClassName} p-5`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_36%)]" />
        <div className="relative flex w-full items-start justify-between">
          <span className="rounded-full bg-white/16 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/16 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <Star weight="fill" className="size-3" />
            {product.highlight}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 min-h-12 text-base font-semibold text-foreground">
            {product.name}
          </h3>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-main">{product.price}</p>
            <p className="text-sm text-muted-foreground">
              {product.installment}
            </p>
          </div>
        </div>

        <Button className="h-10 w-full rounded-2xl" size="lg">
          <ShoppingCartSimple className="size-4" weight="bold" />
          Adicionar ao carrinho
        </Button>
      </div>
    </article>
  );
}
