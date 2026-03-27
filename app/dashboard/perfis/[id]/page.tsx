'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Role, RolePermission } from '@prisma/client'
import { fetchRole, updateRole } from './actions'

type RoleWithPermissions = Role & {
  permissions: RolePermission[]
}

export default function EditarPerfil() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [role, setRole] = useState<RoleWithPermissions | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!id) return

      const data = await fetchRole(id)

      if (!data) {
        router.replace('/404')
        return
      }

      setRole(data)
      setLoading(false)
    }

    load()
  }, [id, router])

  if (loading || !role) {
    return <p className="p-4">Carregando...</p>
  }

  async function onSubmit(formData: FormData) {
    // ✅ GARANTIA PARA O TS
    if (!role) return

    const name = String(formData.get('name'))
    const menus = formData.getAll('menus') as Menu[]

    await updateRole(role.id, name, menus)

    router.push('/dashboard/perfis')
  }

  const enabledMenus = role.permissions.map(p => p.menu)

  return (
    <form action={onSubmit} className="space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">Editar Perfil</h1>

      <input
        name="name"
        defaultValue={role.name}
        className="border p-2 w-full"
        required
      />

      <fieldset className="space-y-1">
        <legend className="font-semibold">Menus</legend>

        {Object.values(Menu).map(menu => (
          <label key={menu} className="flex gap-2">
            <input
              type="checkbox"
              name="menus"
              value={menu}
              defaultChecked={enabledMenus.includes(menu)}
            />
            {menu}
          </label>
        ))}
      </fieldset>

      <button className="bg-black text-white px-4 py-2 rounded">
        Salvar alterações
      </button>
    </form>
  )
}