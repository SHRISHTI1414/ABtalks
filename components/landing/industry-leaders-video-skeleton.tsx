export function IndustryLeadersVideoSkeleton() {
  return (
    <section
      id="industry-videos"
      className="px-4 py-16 md:py-20"
      aria-busy="true"
      aria-label="Industry leaders videos loading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto h-4 w-64 animate-pulse rounded bg-muted" />
        <div className="mx-auto mt-8 h-9 w-80 animate-pulse rounded bg-muted" />
        <div className="mx-auto mt-4 h-5 max-w-md animate-pulse rounded bg-muted" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card/60"
            >
              <div className="aspect-video w-full animate-pulse bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-full animate-pulse rounded bg-muted" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="h-12 w-56 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </section>
  );
}
