// middleware.ts
import { NextResponse, Nextrequest } from "next/server";
import {
  VerifyAuth,
  getTokenFromLocalCookie,
  getRoleFromLocalCookie,
} from "@/lib/auth";

export async function middleware(req = Nextrequest) {
  const token = await getTokenFromLocalCookie();
  const verifiedToken =
    token && (await VerifyAuth(token).catch((err) => console.log(err)));

  const role = await getRoleFromLocalCookie();
  if (req.nextUrl.pathname === "/") {
    return;
  }
  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }
  if (verifiedToken) {
    if (role === "analyst") {
      if (req.url.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    }
    if (role === "user") {
      if (req.url.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
    }
  }
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login", "/profile", "/dashboard/admin", "/dashboard/user"],
};
