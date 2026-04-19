// TODO(security): Add rate limiting before production. No protection today.

import { registerSchema } from "@/lib/validations/auth";
import { createRegistration } from "@/features/auth/register";
import { jsonErr, jsonOk } from "@/lib/json-response";
import { logger } from "@/lib/logger";

const ROUTE = "POST /api/auth/register";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonErr("Invalid JSON body", 400);
    }

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Invalid input";
      return jsonErr(message, 400);
    }

    const result = await createRegistration(parsed.data);

    if (result.ok) {
      return jsonOk({ user: result.user });
    }

    if (result.reason === "email_taken") {
      return jsonErr("An account with this email already exists", 400);
    }

    logger.error("Registration internal error", {
      route: ROUTE,
      cause:
        result.cause instanceof Error
          ? result.cause.message
          : String(result.cause ?? "unknown"),
    });
    return jsonErr("Internal server error", 500);
  } catch (e) {
    logger.error("Register route unexpected error", {
      route: ROUTE,
      cause: e instanceof Error ? e.message : String(e),
    });
    return jsonErr("Internal server error", 500);
  }
}
