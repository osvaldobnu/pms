'use client'

import { atualizarStatusItem } from '@/lib/actions/itens'
import { useEffect, useRef } from 'react'
import { playBeep } from '@/lib/sound'

export default function ListaPedidosPorItem({
  itens,
}: {
  itens: any[]
}) {
  // ✅ evita repetir som em loop
  const jaAlertou = useRef(false)

  useEffect(() => {
    const temPronto = itens.some(
      (item: any) => item.status === 'PRONTO'
    )

    if (temPronto && !jaAlertou.current) {
      playBeep()
      jaAlertou.current = true
    }

    if (!temPronto) {
      jaAlertou.current = false
    }
  }, [itens])

  // ✅ agrupa itens por mesa (somente para visual)
  const itensPorMesa = itens.reduce(
    (acc: Record<string, any[]>, item: any) => {
      const mesa = item.order.comanda.table.number
      if (!acc[mesa]) acc[mesa] = []
      acc[mesa].push(item)
      return acc
    },
    {}
  )

  return (
    <div className="space-y-4">
      {Object.entries(itensPorMesa).map(
        ([mesa, itensMesa]) => (
          <div
            key={mesa}
            className="bg-white p-4 rounded shadow"
          >
            <div className="font-bold text-lg">
              Mesa {mesa}
            </div>

            <ul className="space-y-2 mt-3">
              {(itensMesa as any[]).map(item => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border rounded p-2"
                >
                  <div>
                    <strong>
                      {item.quantity}×{' '}
                      {item.product.name}
                    </strong>
                    <div className="text-xs text-gray-500">
                      {item.status}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {item.status === 'PENDENTE' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(
                            item.id,
                            'EM_PREPARO'
                          )
                        }
                        className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                      >
                        Iniciar
                      </button>
                    )}

                    {item.status === 'EM_PREPARO' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(
                            item.id,
                            'PRONTO'
                          )
                        }
                        className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Pronto
                      </button>
                    )}

                    {item.status === 'PRONTO' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(
                            item.id,
                            'ENTREGUE'
                          )
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
      )}

      {itens.length === 0 && (
        <p className="text-gray-500">
          Nenhum pedido pendente
        </p>
      )}
    </div>
  )
}