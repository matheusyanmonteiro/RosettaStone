import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  const pathnameIsMissingLocale = ['/en', '/pt'].every(
    (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/pt${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
 matcher: [
    /*
     * Ignore todos os caminhos que:
     * 1. Contenham extensões de arquivos (imagens, pdfs, etc)
     * 2. Comecem com _next (arquivos internos do framework)
     * 3. Comecem com api (suas rotas de API)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.pdf$|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}