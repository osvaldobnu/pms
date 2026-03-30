'use server'

import { prisma } from '@/lib/prisma'
import { PaymentMethod } from '@prisma/client'

export async function fecharPessoa({
  pessoaMesaId,
  metodo,
}: {
  pessoaMesaId: string
  metodo: PaymentMethod
}) {
  // ✅ 1. Busca a pessoa JUNTO COM A COMANDA E A MESA
  const pessoa = await prisma.mesaPessoa.findUnique({
    where: { id: pessoaMesaId },
    include: {
      comanda: {
        include: {
          table: true,
        },
      },
    },
  })

  if (!pessoa) {
    throw new Error('Pessoa não encontrada')
  }

  const comanda = pessoa.comanda

  if (!comanda.open) {
    throw new Error('Comanda já está fechada')
  }

  // ✅ 2. Verifica itens pendentes dessa pessoa
  const pendentes = await prisma.orderItem.count({
    where: {
      pessoaMesaId,
      status: { not: 'ENTREGUE' },
    },
  })

  if (pendentes > 0) {
    throw new Error('Existem itens pendentes para essa pessoa')
  }

  // ✅ 3. Calcula o total da pessoa (pode ser zero)
  const itens = await prisma.orderItem.findMany({
    where: { pessoaMesaId },
  })

  const total = itens.reduce((sum, i) => sum + i.price, 0)

  // ✅ 4. Registra o pagamento
  await prisma.payment.create({
    data: {
      comandaId: comanda.id,
      method: metodo,
      amount: total,
    },
  })

  // ✅ 5. Marca a pessoa como paga
  await prisma.mesaPessoa.update({
    where: { id: pessoaMesaId },
    data: { active: false },
  })

  // ✅ 6. Se NÃO houver mais pessoas ativas → fecha comanda e libera mesa
  const pessoasAtivas = await prisma.mesaPessoa.count({
    where: {
      comandaId: comanda.id,
      active: true,
    },
  })

  if (pessoasAtivas === 0) {
    await prisma.comanda.update({
      where: { id: comanda.id },
      data: { open: false },
    })

    await prisma.table.update({
      where: { id: comanda.tableId },
      data: { status: 'LIVRE' },
    })
  }
}