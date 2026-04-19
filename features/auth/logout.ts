import { clearSession } from "@/lib/auth";

/** Clears the auth cookie for the current request (server-only). */
export async function logoutCurrentSession(): Promise<void> {
  await clearSession();
}
