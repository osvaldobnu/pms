import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CategoriasClient from './categorias-client'

type Props = {
  searchParams: Promise<{
    q?: string
    status?: 'ativa' | 'inativa'
    page?: string
  }>
}

export default async function CategoriasPage({ searchParams }: Props) {
  const params = await searchParams

  const q = params.q ?? ''
  const status = params.status
  const page = Number(params.page ?? '1')

  const perPage = 10
  const skip = (page - 1) * perPage

  const where: any = {}

  if (q) {
    where.name = { contains: q, mode: 'insensitive' }
  }

  if (status === 'ativa') {
    where.active = true
  }

  if (status === 'inativa') {
    where.active = false
  }

  const [categorias, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { name: 'asc' },
    }),
    prisma.category.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>

        <Link
          href="/dashboard/categorias/nova"
          className="bg-black text-white px-4 py-2 rounded"
        >
          ➕ Nova Categoria
        </Link>
      </div>

      <CategoriasClient
        categorias={categorias}
        total={total}
        totalPages={totalPages}
        currentPage={page}
        q={q}
        status={status}
      />
    </div>
  )
}