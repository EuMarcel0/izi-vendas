import { useState } from "react";

import { Menu, User, X } from "lucide-react";
import { Link } from "react-router";

import Navbar, { NavLinks } from "../navbar/Navbar";
import {
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-brand text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight">
            <img
              src="/src/assets/logoapp.png"
              alt="Izi Vendas Logo"
              className="md:w-32 w-24"
            />
          </Link>
          <Navbar />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center gap-1.5">
            <Link
              to="/profile"
              className="text-white hover:opacity-50 p-1 rounded-md"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className={cn(
                "text-sm font-light text-white hover:opacity-50 transition-opacity duration-200 py-2",
              )}
            >
              Cadastrar
            </Link>
            {" |"}
            <button
              onClick={() => alert("LOGIN")}
              className={cn(
                "cursor-pointer text-sm font-light text-white hover:opacity-50 transition-opacity duration-200 py-2",
              )}
            >
              Entrar
            </button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-white hover:opacity-50 p-1 rounded-md cursor-pointer md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-72 bg-main text-white border-none p-6"
            >
              <SheetHeader className="mb-0 p-0">
                <SheetTitle className="text-white text-xl font-bold">
                  Izi Vendas
                </SheetTitle>
              </SheetHeader>

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white hover:opacity-50 p-1 rounded-md cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <nav className="flex flex-col mt-4">
                <NavLinks onNavigate={() => setOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
