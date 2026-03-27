'use client'

import { ReactNode } from 'react'
import { Role } from '@prisma/client'
import Sidebar from './Sidebar'

export default function ClientLayout({
  children,
  role,
  pendentesCozinha,
  pendentesBar,
  pendentesProducao,
}: {
  children: ReactNode
  role: Role
  pendentesCozinha: number
  pendentesBar: number
  pendentesProducao: number
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        role={role}
        pendentesCozinha={pendentesCozinha}
        pendentesBar={pendentesBar}
        pendentesProducao={pendentesProducao}
      />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}