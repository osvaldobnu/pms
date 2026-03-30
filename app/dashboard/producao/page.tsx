import { prisma } from '@/lib/prisma'
import ListaPedidosPorItem from '../components/ListaPedidosPorItem'

export default async function ProducaoPage() {
  const pedidos = await prisma.order.findMany({
    where: {
      status: { in: ['ENVIADO', 'EM_PREPARO'] },
    },
    include: {
      comanda: { include: { table: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥🍸 Produção</h1>
      <ListaPedidosPorItem pedidos={pedidos} filtroDestino="TODOS" />
    </div>
  )
}