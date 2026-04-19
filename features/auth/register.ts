import { Prisma } from "@prisma/client";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { createToken, hashPassword, setSession } from "@/lib/auth";
import type { RegisterInput } from "@/lib/validations/auth";

export type RegisterResult =
  | { ok: true; user: { id: string; role: Role } }
  | { ok: false; reason: "email_taken" }
  | { ok: false; reason: "internal_error"; cause?: unknown };

/**
 * Creates user, seeds domain progress, issues session. Does not verify email.
 * Duplicate email: explicit check + P2002 in transaction (race-safe), same outcome.
 */
export async function createRegistration(
  input: RegisterInput
): Promise<RegisterResult> {
  const { name, email, password, selectedDomain } = input;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { ok: false, reason: "email_taken" };
    }

    const hashed = await hashPassword(password);

    let user: { id: string; email: string; role: Role };
    try {
      const created = await prisma.$transaction(async (tx) => {
        const u = await tx.user.create({
          data: {
            name: name.trim(),
            email,
            password: hashed,
            selectedDomain,
          },
          select: { id: true, email: true, role: true },
        });
        for (const domain of ["SE", "ML", "AI"] as const) {
          await tx.domainProgress.upsert({
            where: { userId_domain: { userId: u.id, domain } },
            update: {},
            create: { userId: u.id, domain },
          });
        }
        return u;
      });
      user = created;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        return { ok: false, reason: "email_taken" };
      }
      return { ok: false, reason: "internal_error", cause: e };
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
