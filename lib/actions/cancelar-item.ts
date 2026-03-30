'use server'

import { prisma } from '@/lib/prisma'

export async function cancelarItem({
  orderItemId,
  userId,
  reason,
}: {
  orderItemId: string
  userId: string
  reason: string
}) {
  const item = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
  })

  if (!item) {
    throw new Error('Item não encontrado')
  }

  if (item.status !== 'PENDENTE') {
    throw new Error('Este item não pode mais ser cancelado')
  }

  // ✅ Registra o cancelamento
  await prisma.cancelLog.create({
    data: {
      userId,
      orderItemId,
      reason,
    },
  })

  // ✅ Marca item como CANCELADO
  await prisma.orderItem.update({
    where: { id: orderItemId },
    data: {
      status: 'CANCELADO',
    },
  })
}