/**
 * Central logging — wraps console today; swap implementation (e.g. Sentry) later.
 * Prefer `logger.*` in app code instead of calling `console.*` directly.
 */

type LogContext = Record<string, unknown> | undefined;

function emit(
  level: "error" | "warn" | "info",
  message: string,
  context?: LogContext
): void {
  const fn = console[level];
  if (context !== undefined && Object.keys(context).length > 0) {
    fn(message, context);
  } else {
    fn(message);
  }
}

export const logger = {
  error(message: string, context?: Record<string, unknown>) {
    emit("error", message, context);
  },
  warn(message: string, context?: Record<string, unknown>) {
    emit("warn", message, context);
  },
  info(message: string, context?: Record<string, unknown>) {
    emit("info", message, context);
  },
};
