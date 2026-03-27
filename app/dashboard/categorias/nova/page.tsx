import { criarCategoria } from '@/lib/actions/categorias'

export default function NovaCategoriaPage() {
  return (
    <form
      action={criarCategoria}
      className="max-w-md space-y-4"
    >
      <h1 className="text-xl font-bold">➕ Nova Categoria</h1>

      <input
        name="name"
        placeholder="Nome da categoria"
        className="w-full border p-2"
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  )
}