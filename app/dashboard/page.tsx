import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Role } from '@prisma/client'

export default async function DashboardPage() {
  const user = await getUserFromSession()

  if (!user) redirect('/login')

  // ✅ Redirecionamento por perfil
  if (user.role === Role.GARCOM) redirect('/dashboard/mesas')
  if (user.role === Role.CAIXA) redirect('/dashboard/caixa')
  if (user.role === Role.COZINHA || user.role === Role.BAR)
    redirect('/dashboard/producao')

  // ✅ A PARTIR DAQUI: SOMENTE GERENTE

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  /* ──────────────────────
     🪑 MESAS
  ────────────────────── */
  const mesasOcupadas = await prisma.table.count({
    where: { status: 'OCUPADA' },
  })

  const mesasLivres = await prisma.table.count({
    where: { status: 'LIVRE' },
  })

  /* ──────────────────────
     🔥 PRODUÇÃO
  ────────────────────── */
  const itensEmPreparo = await prisma.orderItem.count({
    where: { status: 'EM_PREPARO' },
  })

  const itensProntos = await prisma.orderItem.count({
    where: { status: 'PRONTO' },
  })

  /* ──────────────────────
     💰 CAIXA
  ────────────────────── */
  const comandasAbertas = await prisma.comanda.count({
    where: { open: true },
  })

  /* ──────────────────────
     ⚠️ ALERTAS
  ────────────────────── */
  const itensProntosDetalhe = await prisma.orderItem.count({
    where: { status: 'PRONTO' },
  })

  const pedidosParados = await prisma.order.findMany({
    where: {
      createdAt: {
        lt: new Date(Date.now() - 15 * 60 * 1000),
      },
      items: {
        some: {
          status: { in: ['PENDENTE', 'EM_PREPARO'] },
        },
      },
    },
    take: 2,
  })

  /* ──────────────────────
     📊 RESUMO DO DIA
  ────────────────────── */
  const totalDia = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: {
      createdAt: { gte: hoje },
    },
  })

  const pedidosDia = await prisma.order.count({
    where: {
      createdAt: { gte: hoje },
    },
  })

  const produtoMaisVendido = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    where: {
      order: {
        createdAt: { gte: hoje },
      },
    },
    orderBy: {
      _sum: { quantity: 'desc' },
    },
    take: 1,
  })

  const produtoTop = produtoMaisVendido[0]
    ? await prisma.product.findUnique({
        where: { id: produtoMaisVendido[0].productId },
      })
    : null

  return (
    <div className="space-y-8">

      {/* ───────── CARDS ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="🪑 Mesas">
          <p>{mesasOcupadas} ocupadas</p>
          <p>{mesasLivres} livres</p>
        </Card>

        <Card title="🔥 Produção">
          <p>{itensEmPreparo} em preparo</p>
          <p>{itensProntos} prontos</p>
        </Card>

        <Card title="💰 Caixa">
          <p>{comandasAbertas} comandas abertas</p>
        </Card>
      </div>

      {/* ───────── ALERTAS ───────── */}
      <div className="space-y-2">
        {itensProntosDetalhe > 0 && (
          <Alert>
            ⚠️ {itensProntosDetalhe} itens prontos aguardando entrega
          </Alert>
        )}

        {pedidosParados.map(p => (
          <Alert key={p.id}>
            ⏰ Pedido #{p.number} está parado há mais de 15 minutos
          </Alert>
        ))}
      </div>

      {/* ───────── RESUMO DO DIA ───────── */}
      <div>
        <h2 className="text-xl font-bold mb-2">📊 Resumo de hoje</h2>
        <p>💰 Total: R$ {(totalDia._sum.amount || 0).toFixed(2)}</p>
        <p>📦 Pedidos: {pedidosDia}</p>
        {produtoTop && <p>🔥 Mais vendido: {produtoTop.name}</p>}
      </div>
    </div>
  )
}

/* ───────── COMPONENTES SIMPLES ───────── */

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-1">{title}</h3>
      {children}
    </div>
  )
}

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded">
      {children}
    </div>
  )
}