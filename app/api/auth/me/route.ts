import { ZodError } from "zod";
import { requireRole } from "@/lib/auth";
import { jsonErr, jsonOk } from "@/lib/json-response";
import { logger } from "@/lib/logger";
import { getMePayloadForUserId } from "@/features/user/get-me";
import { parseAuthMeGetQuery } from "@/lib/validations/auth-me";

const ROUTE = "GET /api/auth/me";

export async function GET(request: Request) {
  let userId: string | undefined;
  try {
    const auth = await requireRole(["USER", "ADMIN"]);
    if (!auth.ok) return auth.response;
    userId = auth.session.userId;

    const url = new URL(request.url);
    parseAuthMeGetQuery(url.searchParams);

    const user = await getMePayloadForUserId(auth.session.userId);
    if (!user) {
      return jsonErr("User not found", 404);
    }

    return jsonOk({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        selectedDomain: user.selectedDomain,
        joinedAt: user.joinedAt,
        role: user.role,
        currentDay: user.currentDay,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      const msg = e.issues[0]?.message ?? "Invalid request";
      return jsonErr(msg, 400);
    }
    logger.error("Unhandled error in auth me route", {
      route: ROUTE,
      userId,
    });
    return jsonErr("Internal server error", 500);
  }
}
