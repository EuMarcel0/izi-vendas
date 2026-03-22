import { Link } from "react-router";

export const navLinks = [
  { label: "Início", to: "/" },
  { label: "Produtos", to: "/products" },
  { label: "Categorias", to: "/categories" },
  { label: "Ofertas", to: "/deals" }
];

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className='text-sm font-medium hover:text-indigo-300 transition-colors'
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  return (
    <nav className='hidden md:flex items-center gap-6'>
      <NavLinks />
    </nav>
  );
}
