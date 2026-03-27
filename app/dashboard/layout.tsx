import { ReactNode } from 'react'
import { contarItensPendentes } from '@/lib/painel'
import { getUserFromSession } from '@/lib/auth'
import Sidebar from './Sidebar'

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        role={user.role}
        pendentesCozinha={pendentesCozinha}
        pendentesBar={pendentesBar}
        pendentesProducao={pendentesProducao}
      />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}