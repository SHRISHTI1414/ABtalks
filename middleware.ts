import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "abtalks-token";

const protectedPaths = ["/dashboard", "/challenge", "/problems", "/profile", "/events", "/podcasts"];
const authPaths = ["/login", "/register", "/signup"];

type JwtPayload = {
  userId: string;
  email: string;
  role?: "USER" | "ADMIN";
};

/** Lazy + per-request — avoids Edge quirks with env at module init; matches jsonwebtoken HS256 signing. */
function getJwtSecretKey(): Uint8Array {
  const raw = process.env.JWT_SECRET ?? "default-secret-change-me";
  return new TextEncoder().encode(raw);
}

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some((p) => pathname.startsWith(p));
}

function isAuthPage(pathname: string): boolean {
  return authPaths.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const { pathname } = request.nextUrl;

    let valid = false;
    let role: "USER" | "ADMIN" | null = null;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, getJwtSecretKey(), {
          algorithms: ["HS256"],
        });
        const decoded = payload as JwtPayload;
        valid = true;
        role = decoded.role ?? "USER";
      } catch {
        valid = false;
      }
    }

    const isProtected = isProtectedPath(pathname);
    const isAuthPageRoute = isAuthPage(pathname);
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
    if (isAuthPageRoute && valid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  } catch (e) {
    console.error("[middleware] fatal — fail closed for protected/admin routes", e);
    const pathname = request.nextUrl.pathname;
    const isProtected = isProtectedPath(pathname);
    const isAdminRoute = pathname.startsWith("/admin");
    if (isProtected || isAdminRoute) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
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
