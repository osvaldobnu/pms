import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()

  const email = String(body.email ?? '').trim()
  const password = String(body.password ?? '').trim()

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  })

  if (!user || user.password !== password) {
    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ success: true })

  // ✅ COOKIE DE SESSÃO
  response.cookies.set('userId', user.id, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true, // Railway é HTTPS
  })

  // ✅ COOKIE DO PAPEL (ESSENCIAL)
  response.cookies.set('userRole', user.role, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })

  return response
}