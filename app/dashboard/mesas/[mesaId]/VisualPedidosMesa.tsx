'use client'

import { useState } from 'react'
import { atualizarStatusItem } from '@/lib/actions/itens'
import { cancelarItem } from '@/lib/actions/cancelar-item'

function StatusBadge({ status }: { status: string }) {
  const base =
    'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded'

  switch (status) {
    case 'PRONTO':
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          ✅ Pronto
        </span>
      )
    case 'EM_PREPARO':
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          ⏳ Em preparo
        </span>
      )
    case 'PENDENTE':
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          ❌ Pendente
        </span>
      )
    case 'ENTREGUE':
      return (
        <span className={`${base} bg-gray-200 text-gray-600`}>
          📦 Entregue
        </span>
      )
    case 'CANCELADO':
      return (
        <span className={`${base} bg-gray-100 text-gray-400`}>
          🚫 Cancelado
        </span>
      )
    default:
      return null
  }
}

export default function VisualPedidosMesa({
  pedidos,
}: {
  pedidos: any[]
}) {
  const [cancelando, setCancelando] = useState<string | null>(null)
  const [motivo, setMotivo] = useState('')

  function tentarCancelar(item: any) {
    if (item.status !== 'PENDENTE') {
      alert(
        'Este item não pode ser cancelado porque já está em andamento.'
      )
      return
    }
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
      location.reload()
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div className="space-y-6">
      {pedidos.map(pedido => {
        // ✅ filtra apenas itens visíveis
        const itensVisiveis = pedido.items.filter(
          (item: any) =>
            item.status !== 'CANCELADO' &&
            item.status !== 'ENTREGUE'
        )

        // ✅ se não sobrou nenhum item, NÃO mostra o pedido
        if (itensVisiveis.length === 0) {
          return null
        }

        return (
          <div
            key={pedido.id}
            className="bg-white rounded shadow p-4"
          >
            <div className="text-sm text-gray-500 mb-4">
              {new Date(pedido.createdAt).toLocaleString('pt-BR')}
            </div>

            <ul className="space-y-2">
              {itensVisiveis.map((item: any) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border rounded px-3 py-2"
                >
                  <div>
                    <div className="font-medium">
                      {item.quantity}× {item.product.name}
                    </div>
                    <div className="mt-1">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {item.status === 'PRONTO' && (
                      <button
                        onClick={() =>
                          atualizarStatusItem(
                            item.id,
                            'ENTREGUE'
                          )
                        }
                        className="
                          inline-flex items-center gap-1
                          text-xs font-medium
                          px-2 py-1
                          rounded
                          bg-gray-100 text-gray-700
                          hover:bg-gray-200
                          transition
                        "
                      >
                        ✔ Marcar Entregue
                      </button>
                    )}

                    {/* ✅ CANCELAR SEMPRE VISÍVEL */}
                    <button
                      onClick={() => tentarCancelar(item)}
                      className="
                        inline-flex items-center gap-1
                        text-xs font-medium
                        px-2 py-1
                        rounded
                        bg-red-100 text-red-700
                        hover:bg-red-200
                        transition
                      "
                    >
                      ✖ Cancelar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}

      {pedidos.length === 0 && (
        <p className="text-gray-400">
          Nenhum pedido ainda
        </p>
      )}

      {/* MODAL */}
      {cancelando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h3 className="font-semibold mb-2">
              Cancelar item
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
