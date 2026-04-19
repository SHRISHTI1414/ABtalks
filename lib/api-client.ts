import { logger } from "@/lib/logger";
import type { Result } from "@/lib/types/api";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/**
 * Typed client for JSON APIs that return `Result<T>`-shaped bodies.
 * Does not throw on HTTP or parse failures — returns `{ ok: false, error }`.
 */
export async function apiFetch<T>(url: string, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(url, init);
    const text = await res.text();
    const trimmed = text.trim();

    if (!trimmed) {
      if (!res.ok) {
        return { ok: false, error: `Request failed (${res.status})` };
      }
      logger.error("apiFetch: empty response body", { url, status: res.status });
      return { ok: false, error: "Invalid response from server" };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      logger.error("apiFetch: response was not valid JSON", {
        url,
        status: res.status,
        preview: trimmed.slice(0, 120),
      });
      return { ok: false, error: "Invalid response from server" };
    }

    if (!isRecord(parsed) || typeof parsed.ok !== "boolean") {
      logger.error("apiFetch: unexpected JSON shape (missing ok)", { url });
      return { ok: false, error: "Invalid response from server" };
    }

    if (parsed.ok === true) {
      if (!("data" in parsed)) {
        logger.error("apiFetch: success response missing data", { url });
        return { ok: false, error: "Invalid response from server" };
      }
      return { ok: true, data: parsed.data as T };
    }

    const err = parsed.error;
    if (typeof err !== "string" || !err) {
      logger.error("apiFetch: error response missing error string", { url });
      return { ok: false, error: "Invalid response from server" };
    }
    return { ok: false, error: err };
  } catch (e) {
    logger.error("apiFetch: network or fetch failure", {
      url,
      message: e instanceof Error ? e.message : String(e),
    });
    return { ok: false, error: "Network error. Please try again." };
  }
}
