import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import Producao from './Producao'

export default async function ProducaoPage() {
  const user = await getUserFromSession()

  const itens = await prisma.orderItem.findMany({
    where: {

      status: {
        notIn: ['ENTREGUE', 'CANCELADO'],
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
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div>
      <Producao itens={itens} userId={user!.id} />
    </div>
  )
}