import { prisma } from '@/lib/prisma'
import { atualizarCategoria } from '@/lib/actions/categorias'

export default async function EditarCategoriaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const categoria = await prisma.category.findUnique({
    where: { id },
  })

  if (!categoria) {
    return <div>Categoria não encontrada</div>
  }

  return (
    <form
      action={atualizarCategoria.bind(null, categoria.id)}
      className="max-w-md space-y-4"
    >
      <h1 className="text-xl font-bold">✏️ Editar Categoria</h1>

      <input
        name="name"
        defaultValue={categoria.name}
        className="w-full border p-2"
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Salvar Alterações
      </button>
    </form>
  )
}