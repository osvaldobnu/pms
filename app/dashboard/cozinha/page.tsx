import { prisma } from '@/lib/prisma'
import ListaPedidosPorItem from '../components/ListaPedidosPorItem'

export default async function CozinhaPage() {
  const itens = await prisma.orderItem.findMany({
    where: {
      status: {
        notIn: ['ENTREGUE', 'CANCELADO'],
      },
      product: {
        destination: 'COZINHA',
      },
    },
    include: {
      product: true,
      order: {
        include: {
          comanda: {
            include: {
              table: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc', // ✅ mais antigos primeiro
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Cozinha
      </h1>

      <ListaPedidosPorItem itens={itens} />
    </div>
  )
}