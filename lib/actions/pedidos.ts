'use server'

import { prisma } from '@/lib/prisma'

export async function criarPedido({
  comandaId,
  userId,
  items,
}: {
  comandaId: string
  userId: string
  items: {
    productId: string
    quantity: number
    note?: string
    pessoaMesaId: string // ✅ OBRIGATÓRIO AGORA
  }[]
}) {
  return prisma.$transaction(async tx => {
    const lastOrder = await tx.order.findFirst({
      where: { comandaId },
      orderBy: { number: 'desc' },
    })

    const nextNumber = lastOrder ? lastOrder.number + 1 : 1

    // ✅ 1. BUSCAR PRODUTOS E CALCULAR PREÇO
    const itemsComPreco = await Promise.all(
      items.map(async item => {
        if (!item.pessoaMesaId) {
          throw new Error(
            'Todo pedido precisa estar associado a uma pessoa'
          )
        }

        const produto = await tx.product.findUnique({
          where: { id: item.productId },
        })

        if (!produto) {
          throw new Error('Produto não encontrado')
        }

        return {
          productId: item.productId,
          quantity: item.quantity,
          note: item.note,
          price: produto.price * item.quantity,
          pessoaMesaId: item.pessoaMesaId, // ✅ AGORA SALVA
        }
      })
    )

    // ✅ 2. CREATE DO PEDIDO + ITENS
    return tx.order.create({
      data: {
        comandaId,
        userId,
        number: nextNumber,
        status: 'ENVIADO',
        items: {
          create: itemsComPreco,
        },
      },
    })
  })
}