'use client'

import { ReactNode } from 'react'
import { Menu } from '@prisma/client'
import Sidebar from './Sidebar'

export default function ClientLayout({
  children,
  menus,
  pendentesCozinha,
  pendentesBar,
  pendentesProducao,
}: {
  children: ReactNode
  menus: Menu[]
  pendentesCozinha: number
  pendentesBar: number
  pendentesProducao: number
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        menus={menus}
        pendentesCozinha={pendentesCozinha}
        pendentesBar={pendentesBar}
        pendentesProducao={pendentesProducao}
      />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}