import { NextResponse } from "next/server";
import { useUser } from "@/lib/authContext";
import { useEffect } from "react";
import { getRoleFromLocalCookie, getIdFromServerCookie } from "@/lib/auth";

export const middleware = (req) => {
  const { user } = useUser();
  const id = getIdFromServerCookie(req);
  const roleType = getRoleFromLocalCookie();
  const jwt = getTokenFromServerCookie(req);
  const url = req.url;

  if (user) {
    if (roleType === "anaylst") {
      if (url.includes("/map")) {
        return NextResponse.redirect("/");
      }
    }
    if (roleType === "user") {
      if (url.includes("/admin")) {
        return NextResponse.redirect("/");
      }
    }
  } else {
    return NextResponse.redirect("/login");
  }
  return NextResponse.next();
};
