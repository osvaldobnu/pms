import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CategoriasClient from './categorias-client'

export default async function CategoriasPage() {
  const categorias = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🏷️ Categorias</h1>

        <Link
          href="/dashboard/categorias/nova"
          className="bg-black text-white px-4 py-2 rounded"
        >
          ➕ Nova Categoria
        </Link>
      </div>

      <CategoriasClient categorias={categorias} />
    </div>
  )
}