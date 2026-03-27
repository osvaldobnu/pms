'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User, Role } from '@prisma/client'
import { fetchUser, updateUser } from './actions'

type UserWithRole = User & {
  role: Role | null
}

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [user, setUser] = useState<UserWithRole | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!id) return

      const [usr, rolesRes] = await Promise.all([
        fetchUser(id),
        fetch('/api/roles').then(r => r.json()),
      ])

      if (!usr) {
        router.replace('/404')
        return
      }

      setUser(usr as UserWithRole)
      setRoles(rolesRes)
      setLoading(false)
    }

    load()
  }, [id, router])

  if (loading || !user) {
    return <p className="p-4">Carregando…</p>
  }

  async function onSubmit(formData: FormData) {
    // ✅ GARANTIA PARA O TYPESCRIPT
    if (!user) return

    await updateUser(user.id, {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      roleId: String(formData.get('roleId')),
      active: formData.get('active') === 'on',
      password: String(formData.get('password') || ''),
    })

    router.push('/dashboard/usuarios')
  }

  return (
    <form action={onSubmit} className="space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">Editar Usuário</h1>

      <input
        name="name"
        defaultValue={user.name}
        className="border p-2 w-full"
        required
      />

      <input
        name="email"
        defaultValue={user.email}
        className="border p-2 w-full"
        required
      />

      <select
        name="roleId"
        defaultValue={user.roleId ?? ''}
        className="border p-2 w-full"
        required
      >
        {roles.map(role => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="active"
          defaultChecked={user.active}
        />
        Usuário ativo
      </label>

      <input
        type="password"
        name="password"
        placeholder="Nova senha (opcional)"
        className="border p-2 w-full"
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  )
}