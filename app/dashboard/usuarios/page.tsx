import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function UsuariosPage() {
  const users = await prisma.user.findMany({
    include: { role: true },
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Link
          href="/dashboard/usuarios/novo"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Novo Usuário
        </Link>
      </div>

      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="border p-4 rounded">
            {user.name} — {user.role?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}