'use server'

import { prisma } from '@/lib/prisma'

export async function encerrarMesa(mesaId: string) {
    const mesa = await prisma.table.findUnique({
        where: { id: mesaId },
        include: {
            comandas: {
                where: { open: true },
                include: {
                    orders: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
        },
    })

    if (!mesa) {
        throw new Error('Mesa não encontrada')
    }

    const comanda = mesa.comandas[0]

    if (!comanda) {
        // Não existe comanda → só libera a mesa
        await prisma.table.update({
            where: { id: mesaId },
            data: { status: 'LIVRE' },
        })
        return
    }

    const itensEmAberto = comanda.orders
        .flatMap(o => o.items)
        .filter(
            i =>
                i.status !== 'ENTREGUE'
        )

    if (itensEmAberto.length > 0) {
        throw new Error(
            'Existem pedidos em andamento. Não é possível encerrar a mesa.'
        )
    }

    // ✅ Fecha comanda
    await prisma.comanda.update({
        where: { id: comanda.id },
        data: { open: false },
    })

    // ✅ Libera a mesa
    await prisma.table.update({
        where: { id: mesaId },
        data: { status: 'LIVRE' },
    })

    // ✅ Desativa pessoas da COMANDA (limpeza)
    await prisma.mesaPessoa.updateMany({
        where: { comandaId: comanda.id },
        data: { active: false },
    })
}