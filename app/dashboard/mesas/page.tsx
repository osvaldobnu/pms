import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function MesasPage() {
  const mesas = await prisma.table.findMany({
    where: { active: true },
    orderBy: { number: 'asc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mesas</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {mesas.map(mesa => {
          const ocupada = mesa.status === 'OCUPADA'

          return (
            <Link
              key={mesa.id}
              href={`/dashboard/mesas/${mesa.id}`}
              className={`rounded-xl p-4 text-center shadow transition
                ${
                  ocupada
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }
              `}
            >
              <div className="text-lg font-bold">
                Mesa {mesa.number}
              </div>
              <div className="text-sm mt-1">
                {ocupada ? 'Ocupada' : 'Livre'}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}