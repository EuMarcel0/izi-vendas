import { useMemo, useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";

import type { ProductListItem } from "@/pages/products/service/productsMock";
import ProductFormDialog from "../product-form-dialog/ProductFormDialog";
import { DataGrid } from "@/components/data-grid/data-grid";
import AppButton from "@/layout/ui/button/AppButton";
import { useDataGrid } from "@/hooks/use-data-grid";
import useModal from "@/components/modal/useModal";

type ProductsDataGridProps = {
  initialData: ProductListItem[];
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function ProductsDataGrid({
  initialData,
}: ProductsDataGridProps) {
  const [data] = useState(initialData);

  const { open: openNewProductFormDialog } = useModal({
    component: ProductFormDialog,
    headerComponent: "Adicionar Produto",
    options: {
      clickOutsideToClose: false,
    },
  });

  const columns = useMemo<ColumnDef<ProductListItem>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Produto",
        meta: {
          label: "Produto",
          cell: { variant: "short-text" },
        },
        size: 280,
      },
      {
        accessorKey: "category",
        header: "Categoria",
        meta: {
          label: "Categoria",
          cell: { variant: "short-text" },
        },
        size: 180,
      },
      {
        accessorKey: "price",
        header: "Preco",
        cell: ({ row }) => currencyFormatter.format(row.original.price),
        meta: {
          label: "Preco",
          cell: { variant: "number" },
        },
        size: 160,
      },
      {
        accessorKey: "stock",
        header: "Estoque",
        meta: {
          label: "Estoque",
          cell: { variant: "number" },
        },
        size: 120,
      },
    ],
    [],
  );

  const dataGrid = useDataGrid<ProductListItem>({
    data,
    columns,
    readOnly: true,
  });

  return (
    <div>
      <div className="flex w-full justify-between">
        <div>
          <h1 className="lg:text-2xl text-base text-main font-semibold">
            Produtos
          </h1>
          <p className="text-sm text-foreground/70">
            Gerencie os produtos disponíveis para venda, incluindo detalhes como
            preço, estoque e categoria.
          </p>
        </div>
        <AppButton
          textButton="Adicionar"
          icon={<PlusIcon className="text-white size-4" />}
          onClick={() => {
            openNewProductFormDialog({
              isEdit: false,
              product: null,
            });
          }}
        />
      </div>
      <DataGrid {...dataGrid} height={420} stretchColumns />
    </div>
  );
}
