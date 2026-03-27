import { ReactNode } from 'react'
import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ClientLayout from './ClientLayout'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getUserFromSession()

  // 🔐 Segurança básica
  if (!user) {
    redirect('/login')
  }

  // ✅ GARANTIR ROLE
  if (!user.roleId) {
    // usuário sem perfil não pode acessar dashboard
    redirect('/login')
  }

  // ✅ Buscar permissões com roleId garantido
  const permissions = await prisma.rolePermission.findMany({
    where: { roleId: user.roleId },
  })

  const menus = permissions.map(p => p.menu)

  // Contadores
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