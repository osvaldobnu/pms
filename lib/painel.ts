import { prisma } from '@/lib/prisma'

export async function contarItensPendentes(destino?: 'COZINHA' | 'BAR') {
  return prisma.orderItem.count({
    where: {
      status: { in: ['PENDENTE', 'EM_PREPARO'] },
      ...(destino
        ? { product: { destination: destino } }
        : {}),
    },
  })
}
``