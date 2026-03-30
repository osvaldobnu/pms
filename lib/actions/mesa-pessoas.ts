'use server'

import { prisma } from '@/lib/prisma'

export async function criarPessoaMesa(
  comandaId: string,
  name: string
) {
  return prisma.mesaPessoa.create({
    data: {
      comandaId,
      name,
    },
  })
}

export async function listarPessoasComanda(
  comandaId: string
) {
  return prisma.mesaPessoa.findMany({
    where: {
      comandaId,
      active: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}
