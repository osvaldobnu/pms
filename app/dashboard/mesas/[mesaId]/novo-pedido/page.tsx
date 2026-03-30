import { prisma } from '@/lib/prisma'
import NovoPedido from './NovoPedido'
import { getUserFromSession } from '@/lib/auth'

export default async function NovoPedidoPage({
  params,
}: {
  params: Promise<{ mesaId: string }>
}) {
  const { mesaId } = await params

  const mesa = await prisma.table.findUnique({
    where: { id: mesaId },
  })

  if (!mesa) {
    return <div>Mesa não encontrada</div>
  }

  const comanda = await prisma.comanda.findFirst({
    where: {
      tableId: mesa.id,
      open: true,
    },
  })

  if (!comanda) {
    return <div>Comanda não encontrada</div>
  }

  const produtos = await prisma.product.findMany({
    where: { available: true },
    orderBy: [{ destination: 'asc' }, { name: 'asc' }],
  })

  const pessoasMesa = await prisma.mesaPessoa.findMany({
    where: {
      comandaId: comanda.id, // ✅ AGORA É POR COMANDA
      active: true,
    },
    orderBy: { createdAt: 'asc' },
  })

  const user = await getUserFromSession()

  if (!user) {
    return <div>Usuário não autenticado</div>
  }

  return (
    <NovoPedido
      produtos={produtos}
      comandaId={comanda.id}
      mesaId={mesa.id}
      userId={user.id}
      pessoasMesa={pessoasMesa}
    />
  )
}