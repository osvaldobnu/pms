'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function atualizarStatusItem(
  itemId: string,
  status: 'PENDENTE' | 'EM_PREPARO' | 'PRONTO' | 'ENTREGUE'
) {
  await prisma.orderItem.update({
    where: { id: itemId },
    data: { status },
  })

  revalidatePath('/dashboard/mesas')
  revalidatePath('/dashboard/producao')
  revalidatePath('/dashboard/cozinha')
  revalidatePath('/dashboard/bar')
}