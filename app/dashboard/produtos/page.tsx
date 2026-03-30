import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import ProdutosClient from './produtos-client'

type Props = {
  searchParams: Promise<{
    q?: string
    status?: 'ativo' | 'inativo'
    categoryId?: string
    page?: string
  }>
}

export default async function ProdutosPage({ searchParams }: Props) {
  // ✅ Next 16: searchParams é Promise
  const params = await searchParams

  const q = params.q ?? ''
  const status = params.status
  const categoryId = params.categoryId
  const page = Number(params.page ?? '1')

  const perPage = 10
  const skip = (page - 1) * perPage

  const where: any = {}

  if (q) {
    where.name = { contains: q, mode: 'insensitive' }
  }

  if (status === 'ativo') {
    where.available = true
  }

  if (status === 'inativo') {
    where.available = false
  }

  if (categoryId) {
    where.categoryId = categoryId
  }

  const [produtos, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: perPage,
      include: { category: true },
      orderBy: [{ category: { name: 'asc' } }, { name: 'asc' }],
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Link
          href="/dashboard/produtos/novo"
          className="bg-black text-white px-4 py-2 rounded"
        >
          ➕ Novo Produto
        </Link>
      </div>

      <ProdutosClient
        produtos={produtos}
        categories={categories}
        totalPages={totalPages}
        currentPage={page}
        q={q}
        status={status}
        categoryId={categoryId}
      />
    </div>
  )
}