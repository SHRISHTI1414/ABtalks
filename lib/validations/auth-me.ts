import { z } from "zod";

/**
 * GET /api/auth/me — query validation.
 *
 * Intentionally strict with **no** accepted query keys today. The schema exists
 * so adding optional params later (e.g. `?include=`) is a deliberate change here,
 * not a missing piece.
 */
export const authMeGetQuerySchema = z
  .record(z.string(), z.string())
  .refine((rec) => Object.keys(rec).length === 0, {
    message: "No query parameters are accepted",
  });

export type AuthMeGetQuery = z.infer<typeof authMeGetQuerySchema>;

export function parseAuthMeGetQuery(searchParams: URLSearchParams) {
  return authMeGetQuerySchema.parse(Object.fromEntries(searchParams.entries()));
}
