import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const url = new URL('/login', request.nextUrl.origin)

  const response = NextResponse.redirect(url)

  // 🔥 Remove cookies de sessão
  response.cookies.delete('userId')
  response.cookies.delete('userRole')

  return response
}