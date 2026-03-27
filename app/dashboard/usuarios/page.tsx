import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function UsuariosPage() {
  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'asc' },
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

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Perfil</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2"></th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role?.name}</td>
              <td className="p-2">
                {user.active ? 'Ativo' : 'Inativo'}
              </td>
              <td className="p-2">
                <Link
                  href={`/dashboard/usuarios/${user.id}`}
                  className="text-blue-600"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}