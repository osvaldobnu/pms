'use client'

import { atualizarStatusCategoria } from "@/lib/actions/categorias"

export default function CategoriasClient({
  categorias,
}: {
  categorias: any[]
}) {
  return (
    <div className="space-y-3">
      {categorias.map(categoria => (
        <div
          key={categoria.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div className="font-semibold">
            {categoria.name}
            {!categoria.active && (
              <span className="ml-2 text-xs text-red-600">
                (Inativa)
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <a
              href={`/dashboard/categorias/${categoria.id}`}
              className="px-3 py-1 border rounded"
            >
              Editar
            </a>

            <button
              onClick={() =>
                atualizarStatusCategoria(
                  categoria.id,
                  !categoria.active
                )
              }
              className="px-3 py-1 bg-gray-700 text-white rounded"
            >
              {categoria.active ? 'Inativar' : 'Ativar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}