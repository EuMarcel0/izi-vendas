import type { PropsWithChildren } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50 text-gray-900'>
      <Header />
      <main className='flex-1 max-w-7xl w-full mx-auto px-4 py-6'>{children}</main>
      <Footer />
    </div>
  );
}
