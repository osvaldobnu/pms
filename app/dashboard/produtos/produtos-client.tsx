'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { atualizarProdutoStatus } from '@/lib/actions/produtos'

const PER_PAGE = 10

export default function ProdutosClient({
  produtos,
  categories,
  totalPages,
  currentPage,
  q,
  status,
  categoryId,
}: {
  produtos: any[]
  categories: any[]
  totalPages: number
  currentPage: number
  q: string
  status?: string
  categoryId?: string
}) {
  const router = useRouter()

  function updateParams(params: {
    q?: string
    status?: string
    categoryId?: string
    page?: number
  }) {
    const search = new URLSearchParams()

    if (params.q) search.set('q', params.q)
    if (params.status) search.set('status', params.status)
    if (params.categoryId)
      search.set('categoryId', params.categoryId)
    if (params.page) search.set('page', String(params.page))

    router.push(`/dashboard/produtos?${search.toString()}`)
  }

  // 🔢 CONTADOR DE REGISTROS
  const start = (currentPage - 1) * PER_PAGE + 1
  const end = start + produtos.length - 1

  return (
    <div className="space-y-4">
      {/* 🔍 FILTROS */}
      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Buscar produto..."
          defaultValue={q}
          className="border p-2 rounded w-64"
          onChange={e =>
            updateParams({
              q: e.target.value,
              status,
              categoryId,
              page: 1,
            })
          }
        />

        <select
          defaultValue={status ?? ''}
          className="border p-2 rounded"
          onChange={e =>
            updateParams({
              q,
              status: e.target.value || undefined,
              categoryId,
              page: 1,
            })
          }
        >
          <option value="">Todos</option>
          <option value="ativo">Ativos</option>
          <option value="inativo">Inativos</option>
        </select>

        <select
          defaultValue={categoryId ?? ''}
          className="border p-2 rounded"
          onChange={e =>
            updateParams({
              q,
              status,
              categoryId: e.target.value || undefined,
              page: 1,
            })
          }
        >
          <option value="">Todas categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 📦 TABELA */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Categoria</th>
              <th className="p-2 text-right">Preço</th>
              <th className="p-2 text-left">Destino</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id} className="border-t">
                <td className="p-2 font-medium">{produto.name}</td>
                <td className="p-2">{produto.category?.name}</td>
                <td className="p-2 text-right">
                  R$ {produto.price.toFixed(2)}
                </td>
                <td className="p-2">{produto.destination}</td>
                <td className="p-2">
                  {produto.available ? 'Ativo' : 'Inativo'}
                </td>
                <td className="p-2 flex gap-2 justify-end">
                  <Link
                    href={`/dashboard/produtos/${produto.id}`}
                    className="px-2 py-1 border rounded"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() =>
                      atualizarProdutoStatus(
                        produto.id,
                        !produto.available
                      )
                    }
                    className="px-2 py-1 rounded bg-gray-700 text-white"
                  >
                    {produto.available ? 'Inativar' : 'Ativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINAÇÃO COM SETAS + CONTADOR */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            {start}–{end} de {totalPages * PER_PAGE} registros
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                updateParams({
                  q,
                  status,
                  categoryId,
                  page: currentPage - 1,
                })
              }
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              ⬅
            </button>

            <span className="px-3 py-1 text-sm">
              Página {currentPage} de {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                updateParams({
                  q,
                  status,
                  categoryId,
                  page: currentPage + 1,
                })
              }
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              ➡
            </button>
          </div>
        </div>
      )}
    </div>
  )
}