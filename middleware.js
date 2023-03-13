// middleware.ts
import { NextResponse, Nextrequest } from "next/server";
import {
  getTokenFromLocalCookie,
  getRoleFromLocalCookie,
  validateToken,
} from "@/lib/auth";
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }
  const token = getTokenFromLocalCookie();
  const role = await getRoleFromLocalCookie();

  if (pathname === "/") {
    return;
  }

  if (token) {
    if (role === "analyst") {
      if (pathname === "login") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
      if (pathname.startsWith("/dashboard/user")) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    }
    if (role === "user") {
      if (pathname === "login") {
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
      if (pathname.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new URL("/dashboard/user"), req.url);
      }
    }
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
