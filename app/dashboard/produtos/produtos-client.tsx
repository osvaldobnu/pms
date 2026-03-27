'use client'

import { atualizarProdutoStatus } from "@/lib/actions/produtos"

export default function ProdutosClient({
  produtos,
}: {
  produtos: any[]
}) {
  return (
    <div className="space-y-3">
      {produtos.map(produto => (
        <div
          key={produto.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">
              {produto.name}
              {!produto.available && (
                <span className="ml-2 text-xs text-red-600">
                  (Inativo)
                </span>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {produto.category.name}• R$ {produto.price.toFixed(2)} • {produto.destination}
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`/dashboard/produtos/${produto.id}`}
              className="px-3 py-1 border rounded"
            >
              Editar
            </a>

            <button
              onClick={() =>
                atualizarProdutoStatus(
                  produto.id,
                  !produto.available
                )
              }
              className="px-3 py-1 rounded bg-gray-700 text-white"
            >
              {produto.available ? 'Inativar' : 'Ativar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
