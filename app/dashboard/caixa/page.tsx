import { prisma } from '@/lib/prisma'
import CaixaClient from './CaixaClient'

export default async function CaixaPage() {
  const comandas = await prisma.comanda.findMany({
    where: { open: true },
    include: {
      table: true,
      orders: {
        include: {
          items: {
            include: { product: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">💰 Caixa</h1>
      <CaixaClient comandas={comandas} />
    </div>
  )
}