'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cancelarItem } from '@/lib/actions/cancelar-item'

export default function Producao({
  itens,
  userId,
}: {
  itens: any[]
  userId: string
}) {
  const [filtro, setFiltro] =
    useState<'TODOS' | 'COZINHA' | 'BAR'>('TODOS')

  const [cancelando, setCancelando] =
    useState<string | null>(null)
  const [motivo, setMotivo] = useState('')

  const router = useRouter()

  async function confirmarCancelamento() {
    if (!motivo.trim()) {
      alert('Informe o motivo do cancelamento')
      return
    }

    try {
      await cancelarItem({
        orderItemId: cancelando!,
        userId,
        reason: motivo,
      })

      setCancelando(null)
      setMotivo('')
      router.refresh()
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div>
      {/* FILTROS */}
      <div className="flex gap-2 mb-6">
        {['TODOS', 'COZINHA', 'BAR'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f as any)}
            className={`px-4 py-2 rounded ${
              filtro === f
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ITENS */}
      <div className="space-y-3">
        {itens
          .filter(i => {
            if (filtro === 'TODOS') return true
            return i.product.destination === filtro
          })
          .map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <div className="font-bold">
                  Mesa {item.order.comanda.table.number}
                </div>

                <div className="text-sm">
                  {item.quantity}× {item.product.name}
                </div>

                <div className="text-xs text-gray-500">
                  {new Date(
                    item.createdAt
                  ).toLocaleString('pt-BR')}
                </div>
              </div>

              {item.status === 'PENDENTE' && (
                <button
                  className="text-red-600 text-sm underline"
                  onClick={() => setCancelando(item.id)}
                >
                  Cancelar
                </button>
              )}
            </div>
          ))}

        {itens.length === 0 && (
          <p className="text-gray-500">
            Nenhum pedido pendente
          </p>
        )}
      </div>

      {/* MODAL */}
      {cancelando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h3 className="font-semibold mb-2">
              Cancelar pedido
            </h3>

            <textarea
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
              placeholder="Informe o motivo"
              className="border w-full p-2 text-sm mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  setCancelando(null)
                  setMotivo('')
                }}
              >
                Voltar
              </button>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={confirmarCancelamento}
              >
                Cancelar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}