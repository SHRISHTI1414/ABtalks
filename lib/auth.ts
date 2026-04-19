import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-me";
const COOKIE_NAME = "abtalks-token";
// Accept either numeric seconds ("3600") or jsonwebtoken duration string ("1h", "7d").
const JWT_EXPIRES_IN = (() => {
  const value = process.env.JWT_EXPIRY?.trim();
  if (!value) return "1h";
  if (/^\d+$/.test(value)) return Number(value);
  // jsonwebtoken/ms-style short durations supported in production env (e.g. 15m, 1h, 7d)
  if (/^\d+(ms|s|m|h|d|w|y)$/i.test(value)) return value;
  return "1h";
})();
const MAX_AGE = 60 * 60; // 1 hour cookie; refresh token flow can extend session

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

type JwtPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
};

export function createToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      selectedDomain: true,
      joinedAt: true,
      role: true,
    },
  });
}

export type AuthRole = JwtPayload["role"];

/**
 * For Route Handlers: ensures the session exists and role is allowed.
 * On failure, return `result.response` as the HTTP response.
 */
export async function requireRole(
  allowedRoles: readonly AuthRole[]
): Promise<
  | { ok: true; session: JwtPayload }
  | { ok: false; response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
  if (!allowedRoles.includes(session.role)) {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true, session };
}

/** Shorthand for admin-only API routes. */
export async function requireAdmin() {
  return requireRole(["ADMIN"] as const);
}
