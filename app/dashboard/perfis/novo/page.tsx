import { prisma } from '@/lib/prisma'
import { Menu } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function NovoPerfilPage() {
  async function createRole(formData: FormData) {
    'use server'

    const name = String(formData.get('name'))
    const menus = formData.getAll('menus') as Menu[]

    await prisma.role.create({
      data: {
        name,
        permissions: {
          create: menus.map(menu => ({ menu })),
        },
      },
    })

    redirect('/dashboard/perfis')
  }

  return (
    <form action={createRole} className="space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">Novo Perfil</h1>

      <input
        name="name"
        placeholder="Nome do perfil"
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
            />
            {menu}
          </label>
        ))}
      </fieldset>

      <button className="bg-black text-white px-4 py-2 rounded">
        Criar Perfil
      </button>
    </form>
  )
}