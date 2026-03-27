import { prisma } from '@/lib/prisma'
import FormMesas from './FormMesas'

export default async function ConfigurarMesasPage() {
  const totalMesas = await prisma.table.count({
    where: { active: true },
  })

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">
        Configuração de Mesas
      </h1>

      <FormMesas totalMesas={totalMesas} />
    </div>
  )
}