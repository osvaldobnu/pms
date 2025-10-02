'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getLinkClasses = (path: string) => `
    font-semibold pb-1 
    ${pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}
  `;

  if (!session) return null; // oculta menu se não estiver logado

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Logo + Nome */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo PMS Artezian"
            width={80}
            height={80}
            className="rounded-md"
          />
          <h1 className="text-xl font-bold text-gray-800">PMS Artezian</h1>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex space-x-4 ml-6">
          <Link href="/dashboard" className={getLinkClasses('/dashboard')}>Dashboard</Link>
          <Link href="/propriedades" className={getLinkClasses('/propriedades')}>Propriedades</Link>
          <Link href="/calendario" className={getLinkClasses('/calendario')}>Calendário</Link>
          <Link href="/reservas" className={getLinkClasses('/reservas')}>Reservas</Link>
        </nav>
      </div>

      {/* Botão de Sair */}
      <button
        onClick={() => signOut()}
        className="text-red-600 hover:text-red-800"
      >
        Sair
      </button>
    </header>
  );
}
