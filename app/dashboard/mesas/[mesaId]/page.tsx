import { prisma } from '@/lib/prisma'
import { getOrCreateComanda } from '@/lib/actions/comandas'
import Link from 'next/link'
import VisualPedidosMesa from './VisualPedidosMesa'

export default async function ComandaPage({
  params,
}: {
  params: Promise<{ mesaId: string }>
}) {
  // ✅ Next 16: params é Promise
  const { mesaId } = await params

  const mesa = await prisma.table.findUnique({
    where: { id: mesaId },
  })

  if (!mesa) {
    return <div>Mesa não encontrada</div>
  }

  const comanda = await getOrCreateComanda(mesa.id)

  const pedidos = await prisma.order.findMany({
    where: { comandaId: comanda.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div>
      {/* TÍTULO */}
      <h1 className="text-2xl font-bold mb-2">
        Mesa {mesa.number}
      </h1>

      <p className="text-gray-500 mb-4">
        Comanda aberta
      </p>

      {/* ✅ BOTÃO ADICIONAR PEDIDO */}
      <div className="mb-6">
        <Link
          href={`/dashboard/mesas/${mesa.id}/novo-pedido`}
          className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition"
        >
          ➕ Adicionar Pedido
        </Link>
      </div>

      {/* ✅ VISUAL DOS PEDIDOS POR STATUS */}
      <VisualPedidosMesa pedidos={pedidos} />
    </div>
  )
}