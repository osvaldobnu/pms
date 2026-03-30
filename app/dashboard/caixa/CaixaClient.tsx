'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fecharPessoa } from '@/lib/actions/fechar-pessoa'

export default function CaixaClient({ comandas }: { comandas: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  async function fechar(
    pessoaMesaId: string,
    metodo: 'DINHEIRO' | 'CARTAO' | 'PIX'
  ) {
    setLoading(pessoaMesaId)

    try {
      await fecharPessoa({ pessoaMesaId, metodo })
      alert('Pagamento registrado com sucesso')
      router.refresh()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {comandas.map(comanda => {
        const itens = comanda.orders.flatMap((o: any) => o.items)
        const pessoas = comanda.pessoas

        return (
          <div
            key={comanda.id}
            className="bg-white p-4 rounded shadow"
          >
            <div className="font-bold text-lg mb-3">
              Mesa {comanda.table.number}
            </div>

            {pessoas.map((pessoa: any) => {
              const itensPessoa = itens.filter(
                (i: any) => i.pessoaMesaId === pessoa.id
              )

              const pendentes = itensPessoa.filter(
                (i: any) => i.status !== 'ENTREGUE'
              )

              const total = itensPessoa.reduce(
                (sum: number, i: any) => sum + i.price,
                0
              )

              const pessoaPaga = !pessoa.active
              const semConsumo = itensPessoa.length === 0

              return (
                <div
                  key={pessoa.id}
                  className={`border rounded p-3 mb-4 ${pessoaPaga
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold">
                      👤 {pessoa.name}
                    </div>

                    {pessoaPaga && (
                      <span className="text-green-700 text-sm font-semibold">
                        ✅ Paga
                      </span>
                    )}

                    {semConsumo && !pessoaPaga && (
                      <span className="text-gray-500 text-sm">
                        Sem consumo
                      </span>
                    )}
                  </div>

                  {!semConsumo && (
                    <ul className="text-sm mb-2">
                      {itensPessoa.map((item: any) => (
                        <li key={item.id}>
                          {item.quantity}× {item.product.name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="text-sm mb-2">
                    Total:{' '}
                    <strong>
                      R$ {total.toFixed(2)}
                    </strong>
                  </div>

                  {pendentes.length > 0 && !pessoaPaga && (
                    <div className="text-red-600 text-sm mb-2">
                      Existem itens pendentes
                    </div>
                  )}

                  {!pessoaPaga && (
                    <div className="flex gap-2">
                      {['DINHEIRO', 'CARTAO', 'PIX'].map(m => (
                        <button
                          key={m}
                          disabled={
                            pendentes.length > 0 ||
                            loading === pessoa.id
                          }
                          onClick={() =>
                            fechar(pessoa.id, m as any)
                          }
                          className="px-3 py-1 bg-black text-white rounded disabled:bg-gray-300"
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}

      {comandas.length === 0 && (
        <p className="text-gray-400">
          Nenhuma comanda aberta
        </p>
      )}
    </div>
  )
}