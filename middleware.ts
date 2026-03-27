import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar rotas internas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const userId = request.cookies.get('userId')?.value

  // Não logado → login
  if (!userId && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Logado acessando raiz
  if (userId && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}