import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'

export async function GET() {
  // 🔐 Segurança básica (opcional, mas recomendado)
  const user = await getUserFromSession()
  if (!user || !user.roleId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const roles = await prisma.role.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(roles)
}