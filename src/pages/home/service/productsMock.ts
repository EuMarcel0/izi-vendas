export type HomeProduct = {
  id: number;
  name: string;
  category: string;
  price: string;
  installment: string;
  highlight: string;
  gradientClassName: string;
};

export const homeProductsMock: HomeProduct[] = [
  {
    id: 1,
    name: "Fone Bluetooth Pulse Pro",
    category: "Audio",
    price: "R$ 189,90",
    installment: "ou 12x de R$ 18,49",
    highlight: "Frete gratis",
    gradientClassName: "from-main via-primary to-violet",
  },
  {
    id: 2,
    name: "Smartwatch Fit Track S2",
    category: "Wearables",
    price: "R$ 249,90",
    installment: "ou 12x de R$ 24,31",
    highlight: "Mais vendido",
    gradientClassName: "from-rose via-highlight to-warning",
  },
  {
    id: 3,
    name: "Caixa de Som Urban Beat",
    category: "Som",
    price: "R$ 319,90",
    installment: "ou 12x de R$ 31,15",
    highlight: "Estoque limitado",
    gradientClassName: "from-dark via-main to-primary",
  },
  {
    id: 4,
    name: "Teclado Mecanico Flow 75",
    category: "Perifericos",
    price: "R$ 279,90",
    installment: "ou 12x de R$ 27,27",
    highlight: "Novo",
    gradientClassName: "from-success via-main to-primary",
  },
  {
    id: 5,
    name: "Mouse Sem Fio Air Click",
    category: "Acessorios",
    price: "R$ 129,90",
    installment: "ou 12x de R$ 12,66",
    highlight: "Entrega rapida",
    gradientClassName: "from-primary via-violet to-accent",
  },
  {
    id: 6,
    name: "Webcam Focus HD",
    category: "Video",
    price: "R$ 159,90",
    installment: "ou 12x de R$ 15,58",
    highlight: "Oferta do dia",
    gradientClassName: "from-warning via-rose to-highlight",
  },
];
