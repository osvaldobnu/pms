import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Menu } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache'

function tempoDecorrido(date: Date) {
  const diff = Date.now() - date.getTime()
  const minutos = Math.floor(diff / 60000)
  const horas = Math.floor(minutos / 60)

  if (horas > 0) {
    return `${horas}h ${minutos % 60}min`
  }

  return `${minutos}min`
}

export default async function DashboardPage() {
  noStore()

  const user = await getUserFromSession()

  if (!user || !user.roleId) {
    redirect('/login')
  }

  const permissions = await prisma.rolePermission.findMany({
    where: { roleId: user.roleId },
  })

  const menus = permissions.map(p => p.menu)

  if (!menus.includes(Menu.DASHBOARD)) {
    if (menus.includes(Menu.MESAS)) redirect('/dashboard/mesas')
    if (menus.includes(Menu.CAIXA)) redirect('/dashboard/caixa')
    if (menus.includes(Menu.PRODUCAO)) redirect('/dashboard/producao')
  }

  const mesasOcupadas = await prisma.table.count({
    where: { active: true, status: 'OCUPADA' },
  })

  const mesasLivres = await prisma.table.count({
    where: { active: true, status: 'LIVRE' },
  })

  const itensEmPreparo = await prisma.orderItem.count({
    where: { status: 'EM_PREPARO' },
  })

  const itensProntos = await prisma.orderItem.count({
    where: { status: 'PRONTO' },
  })

  const pessoasEmAberto = await prisma.mesaPessoa.count({
    where: {
      active: true,
      comanda: { open: true },
    },
  })

  const pedidosEmAndamento = await prisma.orderItem.findMany({
    where: {

      status: {
        notIn: ['ENTREGUE', 'CANCELADO'],
      },

    },
    include: {
      product: true,
      order: {
        include: {
          comanda: {
            include: {
              table: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc', // ✅ maior espera em cima
    },
    take: 10,
  })

  return (
    <div className="space-y-6">
      {/* ✅ INDICADORES */}
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
          <p>{pessoasEmAberto} pessoas em aberto</p>
        </Card>
      </div>

      {/* ✅ LISTA DE PRODUÇÃO */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          🔥 Pedidos em andamento
        </h2>

        {pedidosEmAndamento.length === 0 ? (
          <p className="text-gray-400">
            Nenhum pedido em andamento ✅
          </p>
        ) : (
          <div className="space-y-2">
            {pedidosEmAndamento.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <div className="font-semibold">
                    Mesa {item.order.comanda.table.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.quantity}× {item.product.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    Pedido às{' '}
                    {item.createdAt.toLocaleTimeString('pt-BR')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-orange-600">
                    ⏱ {tempoDecorrido(item.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

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