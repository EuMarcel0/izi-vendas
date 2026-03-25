import { FunnelSimple, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProductsGrid from "@/pages/home/_components/ProductsGrid";
import { homeProductsMock } from "@/pages/home/service/productsMock";

const quickFilters = ["Destaques", "Mais vendidos", "Novidades", "Ofertas"];

export default function Home() {
  return (
    <div className="space-y-8 pb-8">
      <section className="overflow-hidden rounded-[2rem] border border-border/60 bg-linear-to-br from-main via-primary to-violet p-6 text-white shadow-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <Sparkle className="size-4" weight="fill" />
              Showcase simples de produtos
            </span>

            <div className="space-y-3">
              <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
                Seus produtos em formato de vitrine, com visual direto e pronto
                para evoluir.
              </h1>
              <p className="max-w-xl text-sm text-white/80 md:text-base">
                Estruturei a home como um grid de ecommerce simples, com
                destaque visual, busca e cards reutilizaveis para facilitar a
                expansao da tela.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full max-w-md">
                <MagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/65" />
                <Input
                  placeholder="Buscar produto, categoria ou marca"
                  className="h-11 border-white/15 bg-white/10 pl-10 text-white placeholder:text-white/55"
                />
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="h-11 rounded-2xl border border-white/10 bg-white/90 text-main hover:bg-white"
              >
                <FunnelSimple className="size-4" weight="bold" />
                Filtrar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-[1.75rem] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-white/70">Produtos exibidos</p>
              <p className="mt-2 text-2xl font-semibold">
                {homeProductsMock.length}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-white/70">Categorias</p>
              <p className="mt-2 text-2xl font-semibold">6</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-white/70">Faixa media</p>
              <p className="mt-2 text-lg font-semibold">R$ 129 a R$ 319</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-white/70">Atualizacao</p>
              <p className="mt-2 text-lg font-semibold">Hoje</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Catalogo em destaque
            </h2>
            <p className="text-sm text-muted-foreground">
              Base simples para listar produtos com foco em navegacao rapida.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Button
                key={filter}
                variant={filter === "Destaques" ? "default" : "outline"}
                className="rounded-full px-4"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <ProductsGrid products={homeProductsMock} />
      </section>
    </div>
  );
}
