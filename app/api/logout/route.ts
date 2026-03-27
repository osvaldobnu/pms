import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL('/login', request.url)
  )

  // 🔥 Apaga cookies de sessão
  response.cookies.delete('userId')
  response.cookies.delete('userRole')

  return response
}
