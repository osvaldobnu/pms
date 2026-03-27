'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function atualizarProdutoStatus(
    produtoId: string,
    status: boolean
) {
    await prisma.product.update({
        where: { id: produtoId },
        data: { available: status },
    })

    revalidatePath('/dashboard/produtos')
    revalidatePath('/dashboard/mesas')
}

export async function criarProduto(formData: FormData) {
    await prisma.product.create({
        data: {
            name: String(formData.get('name')),
            price: Number(formData.get('price')),
            destination: formData.get('destination') as any,
            categoryId: String(formData.get('categoryId')), // ✅ NOVO
            available: true,
        },
    })

    revalidatePath('/dashboard/produtos')
    redirect('/dashboard/produtos')
}


export async function atualizarProduto(
    produtoId: string,
    formData: FormData
) {
    await prisma.product.update({
        where: { id: produtoId },
        data: {
            name: String(formData.get('name')),
            price: Number(formData.get('price')),
            destination: formData.get('destination') as any,
            categoryId: String(formData.get('categoryId')), // ✅
        },
    })

    revalidatePath('/dashboard/produtos')

    // ✅ volta pra listagem
    redirect('/dashboard/produtos')
}
