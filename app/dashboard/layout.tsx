import { ReactNode } from 'react'
import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import ClientLayout from './ClientLayout'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getUserFromSession()
  if (!user) return null

  const permissions = await prisma.rolePermission.findMany({
    where: { roleId: user.roleId },
  })

  const menus = permissions.map(p => p.menu)

  const pendentesCozinha = await prisma.orderItem.count({
    where: { status: 'EM_PREPARO' },
  })

  const pendentesBar = await prisma.orderItem.count({
    where: { status: 'PRONTO' },
  })

  const pendentesProducao = await prisma.orderItem.count({
    where: { status: 'PENDENTE' },
  })

  return (
    <ClientLayout
      menus={menus}
      pendentesCozinha={pendentesCozinha}
      pendentesBar={pendentesBar}
      pendentesProducao={pendentesProducao}
    >
      {children}
    </ClientLayout>
  )
}