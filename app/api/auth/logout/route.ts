import { jsonOk } from "@/lib/json-response";
import { logger } from "@/lib/logger";
import { logoutCurrentSession } from "@/features/auth/logout";

const ROUTE = "POST /api/auth/logout";

/**
 * Public, idempotent: clears session cookie best-effort. Always returns success
 * so clients can always leave the app (even if cookie was already invalid).
 */
export async function POST() {
  try {
    await logoutCurrentSession();
  } catch (e) {
    logger.error("logoutCurrentSession failed", {
      route: ROUTE,
      message: e instanceof Error ? e.message : String(e),
    });
  }
  return jsonOk({ loggedOut: true } as const);
}
