import { prisma } from '@/lib/prisma'
import { criarProduto } from '@/lib/actions/produtos'

export default async function NovoProdutoPage() {
  const categorias = await prisma.category.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  })

  return (
    <form action={criarProduto} className="max-w-md space-y-4">
      <h1 className="text-xl font-bold">➕ Novo Produto</h1>

      <input
        name="name"
        placeholder="Nome"
        className="w-full border p-2"
      />

      <input
        name="price"
        placeholder="Preço"
        type="number"
        step="0.01"
        className="w-full border p-2"
      />

      <select name="categoryId" className="w-full border p-2">
        {categorias.map((cat : any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select name="destination" className="w-full border p-2">
        <option value="COZINHA">Cozinha</option>
        <option value="BAR">Bar</option>
        <option value="IMEDIATO">Imediato</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  )
}