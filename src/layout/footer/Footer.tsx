import { Link } from "react-router";

import { navLinks } from "../navbar/Navbar";

export default function Footer() {
  return (
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
  );
}
