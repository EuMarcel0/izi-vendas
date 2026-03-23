import { Link, useLocation } from "react-router";

import { navMenuItems } from "./navMenuItems";
import { cn } from "@/lib/utils";

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const isActive = (to: string) => pathname === to;

  return (
    <>
      {navMenuItems.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={cn(
            "text-sm font-light text-white hover:opacity-50 transition-opacity duration-200 py-2",
            isActive(link.to) ? "border-b" : "border-transparent",
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center gap-6 ">
      <NavLinks />
    </nav>
  );
}
