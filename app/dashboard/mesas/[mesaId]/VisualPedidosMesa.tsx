'use client'

import { atualizarStatusItem } from '@/lib/actions/itens'

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
    default:
      return null
  }
}

export default function VisualPedidosMesa({
  pedidos,
}: {
  pedidos: any[]
}) {
  return (
    <div className="space-y-6">
      {pedidos.map(pedido => (
        <div
          key={pedido.id}
          className="bg-white rounded shadow p-4"
        >
          {/* CABEÇALHO */}
          <div className="font-bold text-lg">
            Pedido #{pedido.number}
          </div>

          <div className="text-sm text-gray-500 mb-4">
            {new Date(pedido.createdAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>

          {/* ITENS */}
          <ul className="space-y-2">
            {pedido.items.map((item: any) => (
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

                {/* ✅ AÇÃO SUTIL DO GARÇOM */}
                {item.status === 'PRONTO' && (
                  <button
                    onClick={() =>
                      atualizarStatusItem(item.id, 'ENTREGUE')
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
                    title="Marcar como entregue"
                  >
                    ✔ Marcar Entregue
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {pedidos.length === 0 && (
        <p className="text-gray-400">Nenhum pedido ainda</p>
      )}
    </div>
  )
}
