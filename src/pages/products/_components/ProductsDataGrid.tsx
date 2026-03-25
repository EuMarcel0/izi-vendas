import { useMemo, useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { DataGrid } from "@/components/data-grid/data-grid";
import { useDataGrid } from "@/hooks/use-data-grid";
import type { ProductListItem } from "@/pages/products/service/productsMock";

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

  return <DataGrid {...dataGrid} height={420} stretchColumns />;
}
