'use client'

import { useState } from 'react'

type Pedido = any

export default function Producao({ pedidos }: { pedidos: Pedido[] }) {
  const [filtro, setFiltro] = useState<'TODOS' | 'COZINHA' | 'BAR'>('TODOS')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥🍸 Produção</h1>

      {/* FILTROS */}
      <div className="flex gap-2 mb-6">
        {['TODOS', 'COZINHA', 'BAR'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f as any)}
            className={`px-4 py-2 rounded
              ${filtro === f
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700'
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* PEDIDOS */}
      <div className="space-y-4">
        {pedidos.map(order => {
          const itensCozinha = order.items.filter(
            (i: any) => i.product.destination === 'COZINHA'
          )
          const itensBar = order.items.filter(
            (i: any) => i.product.destination === 'BAR'
          )

          const mostrarCozinha =
            filtro === 'TODOS' || filtro === 'COZINHA'
          const mostrarBar =
            filtro === 'TODOS' || filtro === 'BAR'

          return (
            <div key={order.id} className="bg-white p-4 rounded shadow">
              <div className="font-bold text-lg">
                Mesa {order.comanda.table.number}
              </div>

              <div className="text-sm text-gray-500 mb-3">
                {new Date(order.createdAt).toLocaleString('pt-BR')}
              </div>

              {mostrarCozinha && itensCozinha.length > 0 && (
                <div className="mb-3">
                  <div className="font-semibold text-red-600">
                    🔥 Cozinha
                  </div>
                  <ul className="text-sm">
                    {itensCozinha.map((i: any) => (
                      <li key={i.id}>
                        {i.quantity}× {i.product.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mostrarBar && itensBar.length > 0 && (
                <div>
                  <div className="font-semibold text-blue-600">
                    🍸 Bar
                  </div>
                  <ul className="text-sm">
                    {itensBar.map((i: any) => (
                      <li key={i.id}>
                        {i.quantity}× {i.product.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}

        {pedidos.length === 0 && (
          <p className="text-gray-500">Nenhum pedido pendente</p>
        )}
      </div>
    </div>
  )
}