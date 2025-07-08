import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow access to admin registration and login pages
  if (
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname === "/admin/register" ||
    request.nextUrl.pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next()
  }

  // For other admin routes, the layout will handle authentication
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
