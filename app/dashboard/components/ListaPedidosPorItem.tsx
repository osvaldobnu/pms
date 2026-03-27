'use client'

import { atualizarStatusItem } from '@/lib/actions/itens'
import { useEffect, useRef } from 'react'
import { playBeep } from '@/lib/sound'

export default function ListaPedidosPorItem({
  pedidos,
  filtroDestino, // 'COZINHA' | 'BAR' | 'TODOS'
}: {
  pedidos: any[]
  filtroDestino: 'COZINHA' | 'BAR' | 'TODOS'
}) {

  // ✅ evita repetir som em loop
  const jaAlertou = useRef(false)

  useEffect(() => {
    const temPronto = pedidos.some(order =>
      order.items.some(
        (item: any) => item.status === 'PRONTO'
      )
    )

    if (temPronto && !jaAlertou.current) {
      playBeep() // ✅ beep programático (Web Audio API)
      jaAlertou.current = true
    }

    if (!temPronto) {
      jaAlertou.current = false
    }
  }, [pedidos])

  return (
    <div className="space-y-4">
      {pedidos.map(order => {
        const itensFiltrados = order.items.filter((item: any) => {
          // ❌ NÃO MOSTRA MAIS ENTREGUE
          if (item.status === 'ENTREGUE') return false

          if (filtroDestino === 'TODOS') {
            return item.product.destination !== 'IMEDIATO'
          }

          return item.product.destination === filtroDestino
        })

        if (itensFiltrados.length === 0) return null

        return (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <div className="font-bold text-lg">
              Pedido #{order.number} — Mesa {order.comanda.table.number}
            </div>

            <div className="text-sm text-gray-500 mb-3">
              {new Date(order.createdAt).toLocaleString('pt-BR')}
            </div>

            <ul className="space-y-2">
              {itensFiltrados.map((item: any) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border rounded p-2"
                >
                  <div>
                    <strong>
                      {item.quantity}× {item.product.name}
                    </strong>
                    <div className="text-xs text-gray-500">
                      {item.status}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {item.status === 'PENDENTE' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(item.id, 'EM_PREPARO')
                        }
                        className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                      >
                        Iniciar
                      </button>
                    )}

                    {item.status === 'EM_PREPARO' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(item.id, 'PRONTO')
                        }
                        className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Pronto
                      </button>
                    )}

                    {item.status === 'PRONTO' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(item.id, 'ENTREGUE')
                        }
                        className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Entregar
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}