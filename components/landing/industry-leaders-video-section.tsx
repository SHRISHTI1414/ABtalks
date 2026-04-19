import { Suspense } from "react";
import { getLatestYouTubeVideos } from "@/lib/youtube";
import { IndustryLeadersVideoGrid } from "./industry-leaders-video-grid";
import { IndustryLeadersVideoSkeleton } from "./industry-leaders-video-skeleton";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@abtalks";

async function IndustryLeadersVideoContent() {
  const videos = await getLatestYouTubeVideos(4);

  return (
    <section
      id="industry-videos"
      className="px-4 py-16 md:py-20"
      aria-labelledby="industry-videos-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm text-muted-foreground">
          Featuring voices from companies like Google and other leading tech firms.
        </p>

        <h2
          id="industry-videos-heading"
          className="mt-6 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Learn from industry leaders
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
          Real conversations with engineers and leaders from global tech companies.
        </p>

        {videos.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card/60 px-6 py-16 text-center backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              No videos available right now. Subscribe to stay updated.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-accent"
            >
              <YouTubeIcon className="h-5 w-5 text-primary" />
              Subscribe on YouTube
            </a>
          </div>
        ) : (
          <>
            <IndustryLeadersVideoGrid videos={videos} />
            <div className="mt-10 flex justify-center">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-accent"
              >
                <YouTubeIcon className="h-5 w-5 text-primary" />
                Subscribe on YouTube
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function IndustryLeadersVideoSection() {
  return (
    <Suspense fallback={<IndustryLeadersVideoSkeleton />}>
      <IndustryLeadersVideoContent />
    </Suspense>
  );
}
