import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function PerfisPage() {
  const roles = await prisma.role.findMany({
    include: { permissions: true },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Perfis</h1>
        <Link
          href="/dashboard/perfis/novo"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Novo Perfil
        </Link>
      </div>

      <ul className="space-y-2">
        {roles.map((role : any) => (
          <li
            key={role.id}
            className="border rounded p-4 flex justify-between"
          >
            <span>{role.name}</span>
            <Link
              href={`/dashboard/perfis/${role.id}`}
              className="text-blue-600"
            >
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}