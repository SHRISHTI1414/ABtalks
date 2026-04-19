import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { HeroSection } from "@/components/landing/hero-section";
import {
  communityIdentityBlocks,
  domainCards,
  timelinePhases,
} from "@/lib/landing-content";
import { formatDateForLanding } from "@/lib/utils";
import {
  LandingNav,
  CommunityIdentitySection,
  SixtyDayStructureSection,
  DomainSection,
  LearningSection,
  CommunitySection,
  FinalCtaSection,
  LandingFooter,
} from "@/components/landing";
import type { CommunityStat } from "@/lib/landing-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let user = null;
  let events: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  let podcasts: Awaited<ReturnType<typeof prisma.podcast.findMany>> = [];
  let userCount = 0;
  let submissionCount = 0;
  let eventCount = 0;

  try {
    [user, events, podcasts, userCount, submissionCount, eventCount] =
      await Promise.all([
        getCurrentUser(),
        prisma.event.findMany({
          where: { date: { gte: new Date() } },
          orderBy: { date: "asc" },
          take: 3,
        }),
        prisma.podcast.findMany({
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),
        prisma.user.count(),
        prisma.submission.count(),
        prisma.event.count(),
      ]);
  } catch (error) {
    console.error("Failed to load landing page data", error);
  }

  const stats: CommunityStat[] = [
    { id: "members", value: userCount, label: "Active members" },
    { id: "challenges", value: submissionCount, label: "Challenges completed" },
    { id: "sessions", value: eventCount, label: "Sessions conducted" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <LandingNav user={user} />

      <main className="overflow-x-hidden">
        <HeroSection />

        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-10">
            <CommunityIdentitySection blocks={communityIdentityBlocks} />
            <SixtyDayStructureSection phases={timelinePhases} />
            <DomainSection domains={domainCards} />
            <CommunitySection stats={stats} />
            <LearningSection
              events={events.map((e: (typeof events)[number]) => ({
                id: e.id,
                title: e.title,
                description: e.description,
                dateFormatted: formatDateForLanding(e.date),
                time: e.time,
                location: e.location,
                guestName: e.guestName,
                guestBio: e.guestBio,
                guestImage: e.guestImage,
                outcomes: e.outcomes,
              }))}
              podcasts={podcasts.map((p: (typeof podcasts)[number]) => ({
                id: p.id,
                title: p.title,
                description: p.description,
                guestName: p.guestName,
                episodeNumber: p.episodeNumber,
                publishedAtFormatted: formatDateForLanding(p.publishedAt),
                youtubeUrl: p.youtubeUrl,
                spotifyUrl: p.spotifyUrl,
              }))}
            />
            <FinalCtaSection />
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
