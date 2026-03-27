'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function criarCategoria(formData: FormData) {
  await prisma.category.create({
    data: {
      name: String(formData.get('name')),
      active: true,
    },
  })

  revalidatePath('/dashboard/categorias')
  redirect('/dashboard/categorias')
}

export async function atualizarCategoria(
  categoriaId: string,
  formData: FormData
) {
  await prisma.category.update({
    where: { id: categoriaId },
    data: {
      name: String(formData.get('name')),
    },
  })

  revalidatePath('/dashboard/categorias')
  redirect('/dashboard/categorias')
}

export async function atualizarStatusCategoria(
  categoriaId: string,
  status: boolean
) {
  await prisma.category.update({
    where: { id: categoriaId },
    data: { active: status },
  })

  revalidatePath('/dashboard/categorias')
}