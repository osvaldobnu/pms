'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { Menu } from '@prisma/client'

type MenuItemProps = {
  href: string
  label: string
  icon: ReactNode
  collapsed: boolean
  badge?: number
}

function MenuItem({
  href,
  label,
  icon,
  badge,
  collapsed,
}: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>

      {!collapsed && badge && badge > 0 && (
        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}

export default function Sidebar({
  menus,
  pendentesCozinha,
  pendentesBar,
  pendentesProducao,
}: {
  menus: Menu[]
  pendentesCozinha: number
  pendentesBar: number
  pendentesProducao: number
}) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) setCollapsed(saved === 'true')
  }, [])

  function toggle() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
  }

  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* HEADER */}
      <div className="px-4 py-5 border-b border-gray-800 flex items-center justify-between">
        <h1 className="font-bold text-lg">
          {collapsed ? '🍽' : '🍽 Comanda'}
        </h1>

        <button
          onClick={toggle}
          className="text-gray-400 hover:text-white"
          title="Expandir / recolher menu"
        >
          {collapsed ? '⟩' : '⟨'}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-2 py-4 space-y-1 text-sm">

        {menus.includes(Menu.DASHBOARD) && (
          <MenuItem
            href="/dashboard"
            label="Dashboard"
            icon={<span>🏠</span>}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.MESAS) && (
          <MenuItem
            href="/dashboard/mesas"
            label="Mesas"
            icon={<span>🪑</span>}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.PRODUCAO) && (
          <MenuItem
            href="/dashboard/producao"
            label="Produção"
            icon={<span>📋</span>}
            badge={pendentesProducao}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.COZINHA) && (
          <MenuItem
            href="/dashboard/cozinha"
            label="Cozinha"
            icon={<span>🍳</span>}
            badge={pendentesCozinha}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.BAR) && (
          <MenuItem
            href="/dashboard/bar"
            label="Bar"
            icon={<span>🍸</span>}
            badge={pendentesBar}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.CAIXA) && (
          <MenuItem
            href="/dashboard/caixa"
            label="Caixa"
            icon={<span>💰</span>}
            collapsed={collapsed}
          />
        )}

        {(menus.includes(Menu.PRODUTOS) ||
          menus.includes(Menu.CATEGORIAS) ||
          menus.includes(Menu.CONFIGURACOES)) && (
          <div className="border-t border-gray-800 my-3" />
        )}

        {menus.includes(Menu.PRODUTOS) && (
          <MenuItem
            href="/dashboard/produtos"
            label="Produtos"
            icon={<span>📦</span>}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.CATEGORIAS) && (
          <MenuItem
            href="/dashboard/categorias"
            label="Categorias"
            icon={<span>🏷️</span>}
            collapsed={collapsed}
          />
        )}

        {menus.includes(Menu.CONFIGURACOES) && (
          <MenuItem
            href="/dashboard/configuracoes/mesas"
            label="Config. Mesas"
            icon={<span>🛠️</span>}
            collapsed={collapsed}
          />
        )}

        <div className="border-t border-gray-800 my-3" />

        <button
          onClick={() => {
            window.location.href = '/api/logout'
          }}
          className="flex items-center gap-3 w-full px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg"
        >
          <span>🚪</span>
          {!collapsed && <span>Sair</span>}
        </button>
      </nav>
    </aside>
  )
}