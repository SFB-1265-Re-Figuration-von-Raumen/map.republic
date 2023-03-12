// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getRoleFromLocalCookie, getIdFromLocalCookie } from "@/lib/auth";
import { useUser } from "./lib/authContext";

// This function can be marked `async` if using `await` inside
export async function middleware(request = NextRequest) {
  const { jwt } = getTokenFromServerCookie();
  const { role } = getRoleFromLocalCookie();
  if (request.nextUrl.pathname.startsWith("/")) {
    if (user !== null || user !== undefined) {
      if (role === "anaylst") {
        if (request.nextUrl.pathname.startsWith("/dashboard/user")) {
          return NextResponse.rewrite(new URL("/404", request.url));
        }
        return NextResponse.rewrite(new URL("/dashboard/admin", request.url));
      }
      if (role === "user") {
        if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
          return NextResponse.rewrite(new URL("/404", request.url));
        }
        return NextResponse.rewrite(new URL("/dashboard/user", request.url));
      }
      return NextResponse.rewrite(new URL("/404", request.url));
    } else {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    return NextResponse.rewrite(new URL("/about-2", request.url));
  }
}
