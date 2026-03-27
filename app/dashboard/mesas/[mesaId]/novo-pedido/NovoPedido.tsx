'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { criarPedido } from '@/lib/actions/pedidos'

type Produto = {
  id: string
  name: string
  destination: string
}

export default function NovoPedido({
  produtos,
  comandaId,
  userId,
}: {
  produtos: Produto[]
  comandaId: string
  userId: string
}) {
  const router = useRouter()
  const [quantidades, setQuantidades] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)

  function alterarQuantidade(id: string, value: number) {
    setQuantidades(prev => ({ ...prev, [id]: value }))
  }

  async function enviarPedido() {
    setLoading(true)

    const items = Object.entries(quantidades)
      .filter(([, q]) => q > 0)
      .map(([productId, quantity]) => ({
        productId,
        quantity,
      }))

    if (items.length === 0) {
      alert('Nenhum item selecionado')
      setLoading(false)
      return
    }

    await criarPedido({
      comandaId,
      userId,
      items,
    })

    // ✅ FORÇA ATUALIZAÇÃO DA PÁGINA ANTERIOR
    router.back()
    router.refresh()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Novo Pedido</h1>

      <div className="space-y-3">
        {produtos.map(produto => (
          <div
            key={produto.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <div>
              <div className="font-semibold">{produto.name}</div>
              <div className="text-sm text-gray-500">
                {produto.destination}
              </div>
            </div>

            <input
              type="number"
              min={0}
              className="w-20 border p-1"
              onChange={e =>
                alterarQuantidade(produto.id, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={enviarPedido}
        disabled={loading}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Enviando...' : 'Enviar Pedido'}
      </button>
    </div>
  )
}