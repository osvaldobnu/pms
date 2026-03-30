'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { criarPedido } from '@/lib/actions/pedidos'
import { criarPessoaMesa } from '@/lib/actions/mesa-pessoas'

type Produto = {
  id: string
  name: string
  destination: string
}

type PessoaMesa = {
  id: string
  name: string
}

export default function NovoPedido({
  produtos,
  comandaId,
  mesaId,
  userId,
  pessoasMesa,
}: {
  produtos: Produto[]
  pessoasMesa: PessoaMesa[]
  comandaId: string
  mesaId: string
  userId: string
}) {
  const router = useRouter()

  const [quantidades, setQuantidades] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)

  const [pessoas, setPessoas] = useState<PessoaMesa[]>(pessoasMesa)
  const [pessoaMesaId, setPessoaMesaId] = useState<string | null>(
    pessoasMesa[0]?.id ?? null
  )

  const [novoNome, setNovoNome] = useState('')

  function alterarQuantidade(id: string, value: number) {
    setQuantidades(prev => ({ ...prev, [id]: value }))
  }

  async function adicionarPessoa() {
    if (!novoNome.trim()) {
      alert('Informe um nome')
      return
    }

    // ✅ USAR A COMANDA ATUAL
    const nova = await criarPessoaMesa(comandaId, novoNome)

    setPessoas(prev => [...prev, nova])
    setPessoaMesaId(nova.id)
    setNovoNome('')
  }


  async function enviarPedido() {
    if (!pessoaMesaId) {
      alert('Selecione para quem é o pedido')
      return
    }

    setLoading(true)

    const items = Object.entries(quantidades)
      .filter(([, q]) => q > 0)
      .map(([productId, quantity]) => ({
        productId,
        quantity,
        pessoaMesaId,
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

    router.back()
    router.refresh()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Novo Pedido</h1>

      {/* ✅ PESSOAS DA MESA */}
      <div className="mb-6 space-y-2">
        <h2 className="font-semibold">Para quem é o pedido?</h2>

        {pessoas.length === 0 ? (
          <p className="text-sm text-red-600">
            Nenhuma pessoa cadastrada. Adicione abaixo.
          </p>
        ) : (
          <select
            value={pessoaMesaId ?? ''}
            onChange={e => setPessoaMesaId(e.target.value)}
            className="border p-2 rounded w-full max-w-xs"
          >
            {pessoas.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-2 max-w-xs">
          <input
            value={novoNome}
            onChange={e => setNovoNome(e.target.value)}
            placeholder="Nome (ex: Ricardo)"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={adicionarPessoa}
            className="bg-black text-white px-3 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* ✅ PRODUTOS */}
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
              inputMode="numeric"
              pattern="[0-9]*"
              min={0}
              value={quantidades[produto.id] ?? 0}
              onChange={e =>
                alterarQuantidade(
                  produto.id,
                  Number(e.target.value)
                )
              }
              className="w-20 border p-1 text-center"
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