'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cancelarItem } from '@/lib/actions/cancelar-item'
import { atualizarStatusItem } from '@/lib/actions/itens'

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

  function tentarCancelar(item: any) {
    setCancelando(item.id)
  }

  async function confirmarCancelamento() {
    if (!motivo.trim()) {
      alert('Informe o motivo do cancelamento')
      return
    }

    try {
      await cancelarItem({
        orderItemId: cancelando!,
        reason: motivo,
      })

      setCancelando(null)
      setMotivo('')
      router.refresh()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const itensFiltrados = itens.filter(item => {
    if (filtro === 'TODOS') return true
    return item.product.destination === filtro
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Produção
      </h1>

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

      {/* LISTA DE ITENS */}
      <div className="space-y-3">
        {itensFiltrados.map(item => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-bold">
                Mesa {item.order.comanda.table.number}
              </div>

              <div className="text-sm">
                {item.quantity}× {item.product.name}
              </div>

              <div className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString('pt-BR')}
              </div>

              <div className="text-xs mt-1">
                Status:{' '}
                <strong>{item.status}</strong>
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

              {/* ✅ CANCELAR SEMPRE VISÍVEL */}
              <button
                onClick={() => tentarCancelar(item)}
                className="px-2 py-1 bg-red-600 text-white rounded text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}

        {itensFiltrados.length === 0 && (
          <p className="text-gray-500">
            Nenhum pedido pendente
          </p>
        )}
      </div>

      {/* MODAL DE CANCELAMENTO */}
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
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}