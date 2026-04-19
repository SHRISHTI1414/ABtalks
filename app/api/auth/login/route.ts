// TODO(security): Add rate limiting (e.g., Upstash Ratelimit) before production.
// No brute-force protection exists today.

import { loginSchema } from "@/lib/validations/auth";
import { authenticateLogin } from "@/features/auth/login";
import { jsonErr, jsonOk } from "@/lib/json-response";
import { logger } from "@/lib/logger";

const ROUTE = "POST /api/auth/login";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonErr("Invalid JSON body", 400);
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Invalid input";
      return jsonErr(message, 400);
    }

    const { email, password } = parsed.data;
    const result = await authenticateLogin(email, password);

    if (result.ok) {
      return jsonOk({ user: result.user });
    }

    if (result.reason === "invalid_credentials") {
      return jsonErr("Invalid email or password", 401);
    }

    logger.error("Login internal error", {
      route: ROUTE,
      cause:
        result.cause instanceof Error
          ? result.cause.message
          : String(result.cause ?? "unknown"),
    });
    return jsonErr("Internal server error", 500);
  } catch (e) {
    logger.error("Login route unexpected error", {
      route: ROUTE,
      cause: e instanceof Error ? e.message : String(e),
    });
    return jsonErr("Internal server error", 500);
  }
}
