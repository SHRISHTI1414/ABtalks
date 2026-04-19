/**
 * Landing page content – structured for future DB/CMS integration.
 * Replace with API calls or server-side data when ready.
 */

export interface CommunityIdentityBlock {
  id: string;
  title: string;
  description: string;
  icon: "roadmap" | "mic" | "podcast" | "users";
}

export interface TimelinePhase {
  id: string;
  day: number;
  label: string;
  description: string;
}

export interface DomainCard {
  id: string;
  title: string;
  missionDescription: string;
  skillsOutcome: string[];
  industryAlignment: string;
}

export interface CommunityStat {
  id: string;
  value: string | number;
  label: string;
}

export interface OutcomeItem {
  id: string;
  title: string;
  description: string;
}

export const communityIdentityBlocks: CommunityIdentityBlock[] = [
  {
    id: "structured",
    title: "Structured Growth",
    description:
      "A 60-day roadmap from foundations to interview-ready—one focused step at a time.",
    icon: "roadmap",
  },
  {
    id: "industry",
    title: "Industry Exposure",
    description:
      "Sessions with people who ship real products—what hiring teams actually care about.",
    icon: "mic",
  },
  {
    id: "conversations",
    title: "Real Conversations",
    description:
      "Podcasts with builders: how they think, build, and grow—no hype, no filler.",
    icon: "podcast",
  },
  {
    id: "network",
    title: "Network & Accountability",
    description:
      "Peers on the same journey: shared progress, real answers, gentle accountability.",
    icon: "users",
  },
];

export const timelinePhases: TimelinePhase[] = [
  {
    id: "foundations",
    day: 1,
    label: "Foundations",
    description: "",
  },
  {
    id: "applied",
    day: 20,
    label: "Applied",
    description: "",
  },
  {
    id: "realworld",
    day: 40,
    label: "Real-world",
    description: "",
  },
  {
    id: "readiness",
    day: 60,
    label: "Readiness",
    description: "",
  },
];

export const domainCards: DomainCard[] = [
  {
    id: "se",
    title: "Software Engineering",
    missionDescription:
      "DSA, systems thinking, and patterns that match real product work and interviews.",
    skillsOutcome: ["DSA fluency", "System design basics", "Clean code habits"],
    industryAlignment: "SWE and backend roles at product companies.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    missionDescription:
      "Models, metrics, and pipelines—speak ML like an engineer, not a slide deck.",
    skillsOutcome: ["Pipeline thinking", "Metrics & evaluation", "Deployment awareness"],
    industryAlignment: "ML engineer and applied scientist paths.",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    missionDescription:
      "Deep learning and modern AI—how today’s products are built and shipped.",
    skillsOutcome: ["DL fundamentals", "Transformers", "AI product mindset"],
    industryAlignment: "AI/ML and research-minded engineering roles.",
  },
];

export const communityStats: CommunityStat[] = [
  { id: "members", value: "—", label: "Active members" },
  { id: "challenges", value: "—", label: "Challenges completed" },
  { id: "sessions", value: "—", label: "Sessions conducted" },
];

export const outcomeItems: OutcomeItem[] = [
  {
    id: "thinking",
    title: "Structured Thinking",
    description:
      "Break down problems, prioritize, and explain your approach—the skills interviews reward.",
  },
  {
    id: "confidence",
    title: "Interview-Ready Confidence",
    description:
      "Practice with industry-aligned challenges so systems and ML discussions feel familiar.",
  },
  {
    id: "portfolio",
    title: "Portfolio-Level Skill",
    description:
      "Evidence of how you solve problems—not just what courses you’ve listed.",
  },
  {
    id: "mindset",
    title: "Industry Mindset",
    description:
      "How real teams ship: trade-offs, collaboration, and learning as the default.",
  },
];
