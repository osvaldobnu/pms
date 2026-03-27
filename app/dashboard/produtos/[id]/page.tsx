import { prisma } from '@/lib/prisma'
import { atualizarProduto } from '@/lib/actions/produtos'

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const produto = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  })

  const categorias = await prisma.category.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  })

  if (!produto) return <div>Produto não encontrado</div>

  return (
    <form
      action={atualizarProduto.bind(null, produto.id)}
      className="max-w-md space-y-4"
    >
      <h1 className="text-xl font-bold">✏️ Editar Produto</h1>

      <input
        name="name"
        defaultValue={produto.name}
        className="w-full border p-2"
      />

      <input
        name="price"
        type="number"
        step="0.01"
        defaultValue={produto.price}
        className="w-full border p-2"
      />

      <select
        name="categoryId"
        defaultValue={produto.categoryId}
        className="w-full border p-2"
      >
        {categorias.map((cat : any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        name="destination"
        defaultValue={produto.destination}
        className="w-full border p-2"
      >
        <option value="COZINHA">Cozinha</option>
        <option value="BAR">Bar</option>
        <option value="IMEDIATO">Imediato</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Salvar Alterações
      </button>
    </form>
  )
}