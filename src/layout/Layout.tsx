import { useState } from "react";
import type { PropsWithChildren } from "react";
import { Link } from "react-router";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Produtos", to: "/products" },
  { label: "Categorias", to: "/categories" },
  { label: "Ofertas", to: "/deals" }
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
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

export default function Layout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <div className='min-h-screen flex flex-col bg-gray-50 text-gray-900'>
      {/* Header */}
      <header className='bg-indigo-700 text-white shadow-md sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='text-xl font-bold tracking-tight'>
            IziVendas
          </Link>

          {/* Nav desktop */}
          <nav className='hidden md:flex items-center gap-6'>
            <NavLinks />
          </nav>

          {/* Ações */}
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='text-white hover:bg-indigo-600' asChild>
              <Link to='/profile'>
                <User className='h-5 w-5' />
              </Link>
            </Button>
            <Button variant='ghost' size='icon' className='text-white hover:bg-indigo-600'>
              <ShoppingCart className='h-5 w-5' />
            </Button>

            {/* Menu mobile/tablet */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden text-white hover:bg-indigo-600'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-72 bg-indigo-800 text-white border-none'>
                <SheetHeader className='mb-6'>
                  <SheetTitle className='text-white text-xl font-bold'>IziVendas</SheetTitle>
                </SheetHeader>
                <button
                  onClick={() => setOpen(false)}
                  className='absolute top-4 right-4 text-white hover:text-indigo-300'
                >
                  <X className='h-5 w-5' />
                </button>
                <nav className='flex flex-col gap-5 mt-4'>
                  <NavLinks onNavigate={() => setOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className='flex-1 max-w-7xl w-full mx-auto px-4 py-6'>{children}</main>

      {/* Footer */}
      <footer className='bg-indigo-900 text-indigo-200 text-sm'>
        <div className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <h3 className='font-bold text-white mb-2'>IziVendas</h3>
            <p className='text-indigo-300'>Sua loja online com as melhores ofertas.</p>
          </div>
          <div>
            <h3 className='font-bold text-white mb-2'>Links</h3>
            <ul className='space-y-1'>
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className='hover:text-white transition-colors'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-white mb-2'>Contato</h3>
            <p className='text-indigo-300'>contato@izivendas.com.br</p>
          </div>
        </div>
        <div className='border-t border-indigo-700 text-center py-3 text-indigo-400'>
          © {new Date().getFullYear()} IziVendas. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
