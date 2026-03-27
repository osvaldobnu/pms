'use server'

import { prisma } from '@/lib/prisma'
import { Menu } from '@prisma/client'

export async function fetchRole(id: string) {
  if (!id) return null

  return prisma.role.findUnique({
    where: { id },
    include: { permissions: true },
  })
}

export async function updateRole(
  roleId: string,
  name: string,
  menus: Menu[]
) {
  if (!roleId) return

  await prisma.rolePermission.deleteMany({
    where: { roleId },
  })

  await prisma.role.update({
    where: { id: roleId },
    data: {
      name,
      permissions: {
        create: menus.map(menu => ({ menu })),
      },
    },
  })
}