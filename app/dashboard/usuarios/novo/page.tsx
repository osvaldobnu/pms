import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export default async function NovoUsuario() {
  const roles = await prisma.role.findMany()

  async function createUser(formData: FormData) {
    'use server'

    const name = String(formData.get('name'))
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    const roleId = String(formData.get('roleId'))

    const hash = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        roleId,
      },
    })

    redirect('/dashboard/usuarios')
  }

  return (
    <form action={createUser} className="space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">Novo Usuário</h1>

      <input name="name" placeholder="Nome" className="border p-2 w-full" />
      <input name="email" placeholder="Email" className="border p-2 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        className="border p-2 w-full"
      />

      <select name="roleId" className="border p-2 w-full">
        {roles.map(role => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Criar Usuário
      </button>
    </form>
  )
}