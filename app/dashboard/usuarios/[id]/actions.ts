'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function fetchUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { role: true },
  })
}

export async function updateUser(
  id: string,
  data: {
    name: string
    email: string
    roleId: string
    active: boolean
    password?: string
  }
) {
  const updateData: any = {
    name: data.name,
    email: data.email,
    roleId: data.roleId,
    active: data.active,
  }

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10)
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  })
}