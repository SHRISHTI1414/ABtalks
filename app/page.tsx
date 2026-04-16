import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  communityIdentityBlocks,
  domainCards,
  outcomeItems,
  timelinePhases,
} from "@/lib/landing-content";
import { formatDateForLanding } from "@/lib/utils";
import {
  LandingNav,
  HeroSection,
  CommunityIdentitySection,
  SixtyDayStructureSection,
  DomainSection,
  EventsWebinarsSection,
  PodcastSection,
  IndustryLeadersVideoSection,
  CommunitySection,
  OutcomeSection,
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

  // Dynamic stats – replace placeholders when we have data
  const stats: CommunityStat[] = [
    { id: "members", value: userCount, label: "Active members" },
    { id: "challenges", value: submissionCount, label: "Challenges completed" },
    { id: "sessions", value: eventCount, label: "Sessions conducted" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <LandingNav user={user} />

      <main>
        <HeroSection />
        <CommunityIdentitySection blocks={communityIdentityBlocks} />
        <SixtyDayStructureSection phases={timelinePhases} />
        <DomainSection domains={domainCards} />
        <EventsWebinarsSection
          events={events.map((e) => ({
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
        />
        <PodcastSection
          podcasts={podcasts.map((p) => ({
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
        <IndustryLeadersVideoSection />
        <CommunitySection stats={stats} />
        <OutcomeSection outcomes={outcomeItems} />
        <FinalCtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}
