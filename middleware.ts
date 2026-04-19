import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-change-me"
);
const COOKIE_NAME = "abtalks-token";

const protectedPaths = ["/dashboard", "/challenge", "/problems", "/profile", "/events", "/podcasts"];
const authPaths = ["/login", "/register", "/signup"];

type JwtPayload = {
  userId: string;
  email: string;
  role?: "USER" | "ADMIN";
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  let valid = false;
  let role: "USER" | "ADMIN" | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const decoded = payload as JwtPayload;
      valid = true;
      role = decoded.role ?? "USER";
    } catch {
      valid = false;
    }
  }

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));
  const isAdminRoute = pathname.startsWith("/admin");

  if (isProtected && !valid) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  if (isAdminRoute) {
    if (!valid) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  if (isAuthPage && valid) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/challenge/:path*",
    "/problems/:path*",
    "/profile/:path*",
    "/events/:path*",
    "/podcasts/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/signup",
  ],
};
