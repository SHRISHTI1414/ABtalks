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
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="industry-videos-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Trust badge line */}
        <p className="text-center text-sm text-slate-500">
          Featuring voices from companies like Google and other leading tech
          firms.
        </p>

        <h2
          id="industry-videos-heading"
          className="mt-8 text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          Learn Directly From Industry Leaders.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          Real conversations with engineers and leaders from global tech
          companies.
        </p>

        {videos.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-slate-800/80 bg-slate-900/40 px-6 py-16 text-center">
            <p className="text-slate-400">
              No videos available right now. Subscribe to stay updated.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#ff0000] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#cc0000]"
            >
              <YouTubeIcon className="h-5 w-5" />
              Subscribe to ABTalks on YouTube
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff0000] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#cc0000] hover:shadow-xl"
              >
                <YouTubeIcon className="h-5 w-5" />
                Subscribe to ABTalks on YouTube
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
