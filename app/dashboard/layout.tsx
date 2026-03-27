import { ReactNode } from 'react'
import { contarItensPendentes } from '@/lib/painel'
import { getUserFromSession } from '@/lib/auth'
import ClientLayout from './ClientLayout'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getUserFromSession()
  if (!user) return null

  const pendentesCozinha = await contarItensPendentes('COZINHA')
  const pendentesBar = await contarItensPendentes('BAR')
  const pendentesProducao = await contarItensPendentes()

  return (
    <ClientLayout
      role={user.role}
      pendentesCozinha={pendentesCozinha}
      pendentesBar={pendentesBar}
      pendentesProducao={pendentesProducao}
    >
      {children}
    </ClientLayout>
  )
}