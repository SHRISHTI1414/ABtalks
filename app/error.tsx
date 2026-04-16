"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-red-400 font-mono text-sm max-w-lg text-center bg-red-950/20 p-4 rounded-md border border-red-900/50">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm hover:bg-blue-700"
      >
        Try again
      </button>
      <a href="/" className="text-blue-400 hover:underline">
        Go home
      </a>
    </div>
  );
}
