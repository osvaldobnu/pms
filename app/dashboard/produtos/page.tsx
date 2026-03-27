import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import ProdutosClient from './produtos-client'

export default async function ProdutosPage() {
    const produtos = await prisma.product.findMany({
        include: { category: true },
        orderBy: [{ category: { name: 'asc' } }, { name: 'asc' }],
    })

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">📦 Produtos</h1>

                <Link
                    href="/dashboard/produtos/novo"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    ➕ Novo Produto
                </Link>
            </div>

            <ProdutosClient produtos={produtos} />
        </div>
    )
}