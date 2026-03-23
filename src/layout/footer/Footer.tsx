import { Link, useLocation } from "react-router";
import { navMenuItems } from "../navbar/navMenuItems";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { pathname } = useLocation();
  const isActive = (to: string) => pathname === to;

  return (
    <footer className="bg-main text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="">
          <Link to="/" className="text-xl font-bold tracking-tight">
            <img
              src="/src/assets/logoapp.png"
              alt="Izi Vendas Logo"
              className="w-auto h-10 mb-2"
            />
          </Link>
          <p className="text-white/70">Venda de forma simples e eficiente.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Links</h3>
          <ul className="space-y-1">
            {navMenuItems?.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    "hover:text-white transition-colors",
                    isActive(link.to) ? "border-b" : "border-transparent",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Contato</h3>
          <p className="text-text-white/70">
            <a
              href="https://wa.me/77991776299"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              (77) 9 9177-6299
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/20 text-center py-3 text-white/70">
        © {new Date().getFullYear()} Izi Vendas. Todos os direitos reservados.
      </div>
    </footer>
  );
}
