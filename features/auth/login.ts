import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { createToken, setSession, verifyPassword } from "@/lib/auth";

export type LoginResult =
  | { ok: true; user: { id: string; role: Role } }
  | { ok: false; reason: "invalid_credentials" }
  | { ok: false; reason: "internal_error"; cause?: unknown };

/**
 * Validates credentials, sets session cookie on success.
 * Never distinguishes "user not found" vs "wrong password" (enumeration-safe).
 */
export async function authenticateLogin(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true },
    });
    if (!user) {
      return { ok: false, reason: "invalid_credentials" };
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return { ok: false, reason: "invalid_credentials" };
    }
    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    await setSession(token);
    return {
      ok: true,
      user: { id: user.id, role: user.role },
    };
  } catch (cause) {
    return { ok: false, reason: "internal_error", cause };
  }
}
