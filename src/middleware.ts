import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
 
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })
    const url = new URL(request.url)

    if(token && (url.pathname === '/signin' || url.pathname === '/signup' || url.pathname === '/verify' || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: ['/signin', '/signup', '/dashboard/:path*','/verify/:path*','/']
}

