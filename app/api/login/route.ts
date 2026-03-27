import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  console.log("POST INICIADO")
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

  // ✅ COOKIE TEM QUE SER SETADO NO RESPONSE
  const response = NextResponse.json({ success: true })

  response.cookies.set('userId', user.id, {
    httpOnly: true,
    path: '/',
  })

  return response
}