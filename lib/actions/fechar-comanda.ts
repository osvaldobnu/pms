'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function fecharComanda({
  comandaId,
  metodo,
}: {
  comandaId: string
  metodo: 'DINHEIRO' | 'CARTAO' | 'PIX'
}) {
  return prisma.$transaction(async tx => {
    const comanda = await tx.comanda.findUnique({
      where: { id: comandaId },
      include: {
        orders: {
          include: {
            items: true,
          },
        },
        table: true,
      },
    })

    if (!comanda || !comanda.open) {
      throw new Error('Comanda inválida')
    }

    const itensPendentes = comanda.orders.flatMap(o =>
      o.items.filter(
        i => i.status !== 'ENTREGUE'
      )
    )

    if (itensPendentes.length > 0) {
      throw new Error(
        'Existem itens pendentes. Não é possível fechar a comanda.'
      )
    }

    const total = await tx.orderItem.aggregate({
      _sum: { price: true },
      where: {
        order: { comandaId },
      },
    })

    await tx.payment.create({
      data: {
        comandaId,
        method: metodo,
        amount: total._sum.price ?? 0,
      },
    })

    await tx.comanda.update({
      where: { id: comandaId },
      data: { open: false },
    })

    await tx.table.update({
      where: { id: comanda.tableId },
      data: { status: 'LIVRE' },
    })

    revalidatePath('/dashboard/caixa')
    revalidatePath('/dashboard/mesas')

    return true
  })
}
