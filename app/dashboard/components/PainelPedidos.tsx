import { prisma } from '@/lib/prisma'

export default async function PainelPedidos({
  destination,
  title,
}: {
  destination: 'COZINHA' | 'BAR'
  title: string
}) {
  const orders = await prisma.order.findMany({
    where: {
      status: { in: ['ENVIADO', 'EM_PREPARO'] },
      items: {
        some: {
          product: {
            destination,
          },
        },
      },
    },
    include: {
      comanda: {
        include: { table: true },
      },
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="font-bold text-lg">
              Pedido #{order.number} — Mesa {order.comanda.table.number}
            </div>

            <div className="text-sm text-gray-500 mb-2">
              {new Date(order.createdAt).toLocaleString('pt-BR')}
            </div>

            <ul className="text-sm space-y-1">
              {order.items
                .filter(item => item.product.destination === destination)
                .map(item => (
                  <li key={item.id}>
                    {item.quantity}× {item.product.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-gray-400">Nenhum pedido pendente</p>
        )}
      </div>
    </div>
  )
}