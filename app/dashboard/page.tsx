import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Menu } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache'

export default async function DashboardPage() {
  noStore()

  const user = await getUserFromSession()

  // 🔐 Segurança básica
  if (!user) {
    redirect('/login')
  }

  // ✅ Garantir que o usuário tem perfil
  if (!user.roleId) {
    redirect('/login')
  }

  // ✅ Buscar permissões do perfil
  const permissions = await prisma.rolePermission.findMany({
    where: { roleId: user.roleId },
  })

  const menus = permissions.map(p => p.menu)

  // ✅ Redirecionamento inteligente baseado em permissões
  if (!menus.includes(Menu.DASHBOARD)) {
    if (menus.includes(Menu.MESAS)) {
      redirect('/dashboard/mesas')
    }

    if (menus.includes(Menu.CAIXA)) {
      redirect('/dashboard/caixa')
    }

    if (menus.includes(Menu.PRODUCAO)) {
      redirect('/dashboard/producao')
    }
  }

  // ✅ A PARTIR DAQUI: APENAS QUEM TEM DASHBOARD
  const mesasOcupadas = await prisma.table.count({
    where: {
      active: true,
      status: 'OCUPADA',
    },
  })

  const mesasLivres = await prisma.table.count({
    where: {
      active: true,
      status: 'LIVRE',
    },
  })

  const itensEmPreparo = await prisma.orderItem.count({
    where: { status: 'EM_PREPARO' },
  })

  const itensProntos = await prisma.orderItem.count({
    where: { status: 'PRONTO' },
  })

  const comandasAbertas = await prisma.comanda.count({
    where: { open: true },
  })

  return (
    <div className="space-y-6">
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