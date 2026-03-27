'use client'

import { fecharComanda } from '@/lib/actions/fechar-comanda'
import { useState } from 'react'

export default function CaixaClient({ comandas }: { comandas: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)

  async function fechar(id: string, metodo: 'DINHEIRO' | 'CARTAO' | 'PIX') {
    setLoading(id)
    try {
      await fecharComanda({ comandaId: id, metodo })
      alert('Comanda fechada com sucesso')
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {comandas.map(comanda => {
        // Todos os itens da comanda
        const itens = comanda.orders.flatMap((o: any) => o.items)

        // Itens pendentes
        const itensPendentes = itens.filter(
          (i: any) => i.status !== 'ENTREGUE'
        )

        const total = itens.reduce(
          (sum: number, i: any) => sum + i.price,
          0
        )

        const bloqueado = itensPendentes.length > 0

        return (
          <div key={comanda.id} className="bg-white p-4 rounded shadow">
            <div className="font-bold text-lg mb-1">
              Mesa {comanda.table.number}
            </div>

            <div className="text-sm text-gray-600 mb-2">
              Total: <strong>R$ {total.toFixed(2)}</strong>
            </div>

            {/* ⚠️ AVISO DE PENDÊNCIA COM LISTA */}
            {bloqueado && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                <div className="text-red-700 font-semibold mb-1">
                  Existem itens pendentes:
                </div>

                <ul className="text-sm text-red-600 list-disc list-inside">
                  {itensPendentes.map((item: any) => (
                    <li key={item.id}>
                      {item.quantity}× {item.product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              {['DINHEIRO', 'CARTAO', 'PIX'].map(m => (
                <button
                  key={m}
                  disabled={bloqueado || loading === comanda.id}
                  onClick={() =>
                    fechar(comanda.id, m as any)
                  }
                  className="px-3 py-1 rounded bg-black text-white disabled:bg-gray-300"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {comandas.length === 0 && (
        <p className="text-gray-400">Nenhuma comanda aberta</p>
      )}
    </div>
  )
}