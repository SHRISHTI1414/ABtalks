import { prisma } from "@/lib/db";
import { getOrCreateDomainProgress } from "@/lib/domain-progress";

export type MePayload = {
  id: string;
  name: string;
  email: string;
  selectedDomain: "SE" | "ML" | "AI";
  joinedAt: Date;
  role: "USER" | "ADMIN";
  currentDay: number;
  currentStreak: number;
  longestStreak: number;
};

/**
 * Loads the authenticated user's profile plus domain progress for their selected domain.
 */
export async function getMePayloadForUserId(userId: string): Promise<MePayload | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      selectedDomain: true,
      joinedAt: true,
      role: true,
    },
  });
  if (!user) return null;

  const progress = await getOrCreateDomainProgress(user.id, user.selectedDomain);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    selectedDomain: user.selectedDomain,
    joinedAt: user.joinedAt,
    role: user.role,
    currentDay: progress.currentDay,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
  };
}
