'use server'

import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'

export async function cancelarItem({
  orderItemId,
  reason,
}: {
  orderItemId: string
  reason: string
}) {
  const user = await getUserFromSession()

  if (!user) {
    throw new Error('Usuário não autenticado')
  }

  const item = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
  })

  if (!item) {
    throw new Error('Item não encontrado')
  }

  // ✅ Registra o cancelamento com o usuário correto
  await prisma.cancelLog.create({
    data: {
      userId: user.id,
      orderItemId,
      reason,
    },
  })

  // ✅ Marca como CANCELADO
  await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status: 'CANCELADO' },
  })
}