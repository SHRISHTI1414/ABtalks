/**
 * Shared API contracts for JSON routes using `{ ok, data } | { ok, error }`.
 * Add types here as routes are migrated — avoid unused boilerplate.
 */

import type { Role } from "@prisma/client";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** POST /api/auth/logout — `jsonOk` payload when session was cleared. */
export type LogoutSuccessData = { loggedOut: true };

/** POST /api/auth/login — minimal user; full profile from GET /api/auth/me. */
export type LoginSuccessData = { user: { id: string; role: Role } };

/** POST /api/auth/register — same minimal shape as login after auto sign-in. */
export type RegisterSuccessData = { user: { id: string; role: Role } };

export type { Role };
