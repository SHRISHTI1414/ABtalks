import { NextResponse } from "next/server";

export type JsonOk<T> = { ok: true; data: T };
export type JsonErr = { ok: false; error: string };

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data } satisfies JsonOk<T>, init);
}

export function jsonErr(error: string, status = 400, init?: ResponseInit) {
  return NextResponse.json({ ok: false, error } satisfies JsonErr, { ...init, status });
}
