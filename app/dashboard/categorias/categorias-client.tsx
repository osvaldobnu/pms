'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { atualizarStatusCategoria } from '@/lib/actions/categorias'

const PER_PAGE = 10

export default function CategoriasClient({
  categorias,
  total,
  totalPages,
  currentPage,
  q,
  status,
}: {
  categorias: any[]
  total: number
  totalPages: number
  currentPage: number
  q: string
  status?: string
}) {
  const router = useRouter()

  function updateParams(params: {
    q?: string
    status?: string
    page?: number
  }) {
    const search = new URLSearchParams()

    if (params.q) search.set('q', params.q)
    if (params.status) search.set('status', params.status)
    if (params.page) search.set('page', String(params.page))

    router.push(`/dashboard/categorias?${search.toString()}`)
  }

  // 🔢 Contador
  const start = (currentPage - 1) * PER_PAGE + 1
  const end = Math.min(currentPage * PER_PAGE, total)

  return (
    <div className="space-y-4">
      {/* 🔍 FILTROS */}
      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Buscar categoria..."
          defaultValue={q}
          className="border p-2 rounded w-64"
          onChange={e =>
            updateParams({
              q: e.target.value,
              status,
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
              page: 1,
            })
          }
        >
          <option value="">Todas</option>
          <option value="ativa">Ativas</option>
          <option value="inativa">Inativas</option>
        </select>
      </div>

      {/* 🏷️ TABELA */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {categorias.map(categoria => (
              <tr key={categoria.id} className="border-t">
                <td className="p-2 font-medium">
                  {categoria.name}
                </td>
                <td className="p-2">
                  {categoria.active ? 'Ativa' : 'Inativa'}
                </td>
                <td className="p-2 flex gap-2 justify-end">
                  <Link
                    href={`/dashboard/categorias/${categoria.id}`}
                    className="px-2 py-1 border rounded"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() =>
                      atualizarStatusCategoria(
                        categoria.id,
                        !categoria.active
                      )
                    }
                    className="px-2 py-1 bg-gray-700 text-white rounded"
                  >
                    {categoria.active ? 'Inativar' : 'Ativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            {start}–{end} de {total} registros
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                updateParams({
                  q,
                  status,
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