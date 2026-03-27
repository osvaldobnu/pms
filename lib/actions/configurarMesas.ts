'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { TableStatus } from '@prisma/client'

export async function configurarQuantidadeMesas(
    _prevState: any,
    formData: FormData
) {
    const novaQuantidade = Number(formData.get('quantidade'))

    try {
        if (novaQuantidade <= 0) {
            throw new Error('Quantidade inválida')
        }

        const todasMesas = await prisma.table.findMany({
            orderBy: { number: 'asc' },
        })

        const mesasAtivas = todasMesas.filter(m => m.active)
        const mesasInativas = todasMesas.filter(m => !m.active)

        const quantidadeAtiva = mesasAtivas.length

        // ✅ AUMENTAR
        if (novaQuantidade > quantidadeAtiva) {
            let falta = novaQuantidade - quantidadeAtiva

            for (const mesa of mesasInativas) {
                if (falta === 0) break
                await prisma.table.update({
                    where: { id: mesa.id },
                    data: { active: true },
                })
                falta--
            }

            if (falta > 0) {
                const ultimoNumero = todasMesas.at(-1)?.number ?? 0

                const novas = Array.from({ length: falta }, (_, i) => ({
                    number: ultimoNumero + i + 1,
                    status: TableStatus.LIVRE, // ✅ enum
                    active: true,
                }))

                await prisma.table.createMany({ data: novas })
            }
        }

        // ✅ DIMINUIR
        if (novaQuantidade < quantidadeAtiva) {
            const excesso = quantidadeAtiva - novaQuantidade

            const paraDesativar = mesasAtivas
                .slice(-excesso)
                .reverse()

            for (const mesa of paraDesativar) {
                if (mesa.status !== 'LIVRE') {
                    throw new Error(
                        `Mesa ${mesa.number} está ocupada`
                    )
                }

                await prisma.table.update({
                    where: { id: mesa.id },
                    data: { active: false },
                })
            }
        }

        revalidatePath('/dashboard', 'layout')
        revalidatePath('/dashboard/mesas')
        revalidatePath('/dashboard/configuracoes/mesas')

        return { success: true, message: 'Configuração atualizada com sucesso' }
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}