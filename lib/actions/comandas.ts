'use server'

import { prisma } from '@/lib/prisma'

export async function getOrCreateComanda(tableId: string) {
  let comanda = await prisma.comanda.findFirst({
    where: {
      tableId,
      open: true,
    },
  })

  if (!comanda) {
    comanda = await prisma.comanda.create({
      data: {
        tableId,
        open: true,
      },
    })

    await prisma.table.update({
      where: { id: tableId },
      data: { status: 'OCUPADA' },
    })
  }

  return comanda
}