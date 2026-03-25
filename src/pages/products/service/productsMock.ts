export type ProductListItem = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
};

export const productsMock: ProductListItem[] = [
  {
    id: 1,
    title: "Fone Bluetooth Pulse Pro",
    category: "Audio",
    price: 189.9,
    stock: 14,
  },
  {
    id: 2,
    title: "Smartwatch Fit Track S2",
    category: "Wearables",
    price: 249.9,
    stock: 8,
  },
  {
    id: 3,
    title: "Caixa de Som Urban Beat",
    category: "Som",
    price: 319.9,
    stock: 6,
  },
  {
    id: 4,
    title: "Teclado Mecanico Flow 75",
    category: "Perifericos",
    price: 279.9,
    stock: 11,
  },
  {
    id: 5,
    title: "Mouse Sem Fio Air Click",
    category: "Acessorios",
    price: 129.9,
    stock: 22,
  },
];
