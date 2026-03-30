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
    where: {
      status: {
        in: ['PENDENTE', 'EM_PREPARO'],
      },
      product: {
        destination: 'COZINHA',
      },
    },
  })

  const pendentesBar = await prisma.orderItem.count({
    where: {
      status: {
        in: ['PENDENTE', 'EM_PREPARO'],
      },
      product: {
        destination: 'BAR',
      },
    },
  })

  const pendentesProducao = await prisma.orderItem.count({
    where: {
      status: {
        in: ['PENDENTE', 'EM_PREPARO'],
      },
    },
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