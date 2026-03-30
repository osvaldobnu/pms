'use server'

import { prisma } from '@/lib/prisma'

export async function criarPessoaMesa(
    comandaId: string,
    name: string
) {
    return prisma.mesaPessoa.create({
        data: {
            comandaId, // ✅ COMANDA, NÃO MESA
            name,
        },
    })
}

export async function listarPessoasMesa(mesaId: string) {
    return prisma.mesaPessoa.findMany({
        where: { mesaId, active: true },
        orderBy: { createdAt: 'asc' },
    })
}