import { useState } from "react";

import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Link } from "react-router";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navbar, { NavLinks } from "../navbar/Navbar";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='bg-indigo-700 text-white shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/' className='text-xl font-bold tracking-tight'>
          IziVendas
        </Link>

        <Navbar />

        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' className='text-white hover:bg-indigo-600' asChild>
            <Link to='/profile'>
              <User className='h-5 w-5' />
            </Link>
          </Button>
          <Button variant='ghost' size='icon' className='text-white hover:bg-indigo-600'>
            <ShoppingCart className='h-5 w-5' />
          </Button>

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
  );
}
