// import { NextResponse } from 'next/server'

// export function middleware (request) {
//   const path = request.nextUrl.pathname
//   const isPublicPath = path === '/login'
//   const token = request.cookies.get('token')?.value || ''

//   if (isPublicPath && token.length > 0) {
//     return NextResponse.redirect(new URL(`/admin${path}`, request.nextUrl))
//   }
//   if (!isPublicPath && !token.length > 0) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }
// }

export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/admin/dashboard/posts',
    '/admin/dashboard/materi',
    'admin/dashboard/materi/upload'
  ]
}
