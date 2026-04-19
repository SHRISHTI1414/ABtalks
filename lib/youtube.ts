/**
 * YouTube Data API v3 – fetch latest channel videos.
 * Requires YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID in env.
 */

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  /** Human-readable duration e.g. "15:33" */
  duration: string;
  /** Guest name if extractable from title/description */
  guestName: string | null;
  /** Company mention e.g. "Ex-Google" if extractable */
  companyMention: string | null;
  watchUrl: string;
  publishedAt: string;
}

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

/** Parse ISO 8601 duration (e.g. PT15M33S, PT1H2M10S) to "15:33" or "1:02:10" */
function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const hours = parseInt(match[1] ?? "0", 10);
  const minutes = parseInt(match[2] ?? "0", 10);
  const seconds = parseInt(match[3] ?? "0", 10);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Try to extract guest name and company from title or description.
 * Looks for patterns like "Name | Company", "Name - Company", "with Name (Company)".
 */
function extractGuestAndCompany(
  title: string,
  description: string
): { guestName: string | null; companyMention: string | null } {
  const text = `${title} ${description}`;
  // "with X (Y)" or "X (Y)" or "X | Y" or "X - Y"
  const withParens = text.match(/(?:with\s+)?([A-Za-z\s]+)\s*[\(\|]\s*([^\)\|]+)[\)\|]/);
  if (withParens?.[1] != null && withParens[2] != null) {
    const name = withParens[1].trim();
    const company = withParens[2].trim();
    if (name.length > 1 && company.length > 1) {
      return {
        guestName: name.length > 50 ? null : name,
        companyMention: company.length > 40 ? null : company,
      };
    }
  }
  // "Ex-Google" or "at Google" style
  const exCompany = text.match(/(?:Ex-|at\s+)([A-Za-z0-9&\s]+?)(?:\s|,|\.|$)/);
  const exCompanyName = exCompany?.[1];
  if (exCompanyName != null) {
    const trimmed = exCompanyName.trim();
    return {
      guestName: null,
      companyMention: trimmed.length > 30 ? null : trimmed,
    };
  }
  return { guestName: null, companyMention: null };
}

/**
 * Fetch latest videos from the configured YouTube channel.
 * Cached with revalidation every 1 hour. Returns [] if key/channel missing or API fails.
 */
export async function getLatestYouTubeVideos(
  maxResults: number = 4
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return [];
  }

  try {
    // 1) Search latest videos by channel
    const searchUrl = new URL(`${YOUTUBE_API_BASE}/search`);
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("channelId", channelId);
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("order", "date");
    searchUrl.searchParams.set("maxResults", String(maxResults));
    searchUrl.searchParams.set("key", apiKey);

    const searchRes = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 }, // 1 hour
    });

    if (!searchRes.ok) {
      return [];
    }

    const searchData = (await searchRes.json()) as {
      items?: Array<{ id?: { videoId?: string }; snippet?: { title: string; description: string } }>;
    };

    const items = searchData.items ?? [];
    const videoIds = items
      .map((i) => i.id?.videoId)
      .filter((id): id is string => Boolean(id));

    if (videoIds.length === 0) {
      return [];
    }

    // 2) Get video details (duration, thumbnails)
    const videosUrl = new URL(`${YOUTUBE_API_BASE}/videos`);
    videosUrl.searchParams.set("part", "snippet,contentDetails");
    videosUrl.searchParams.set("id", videoIds.join(","));
    videosUrl.searchParams.set("key", apiKey);

    const videosRes = await fetch(videosUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!videosRes.ok) {
      return [];
    }

    const videosData = (await videosRes.json()) as {
      items?: Array<{
        id: string;
        snippet?: {
          title: string;
          description: string;
          publishedAt: string;
          thumbnails?: { medium?: { url: string }; high?: { url: string } };
        };
        contentDetails?: { duration?: string };
      }>;
    };

    const videoList = videosData.items ?? [];

    return videoList.map((v) => {
      const snippet = v.snippet;
      const thumbnails = snippet?.thumbnails;
      const thumbUrl =
        thumbnails?.high?.url ?? thumbnails?.medium?.url ?? "";
      const duration = v.contentDetails?.duration
        ? parseDuration(v.contentDetails.duration)
        : "";
      const { guestName, companyMention } = extractGuestAndCompany(
        snippet?.title ?? "",
        snippet?.description ?? ""
      );

      return {
        id: v.id,
        title: snippet?.title ?? "",
        thumbnailUrl: thumbUrl,
        duration,
        guestName,
        companyMention,
        watchUrl: `https://www.youtube.com/watch?v=${v.id}`,
        publishedAt: snippet?.publishedAt ?? "",
      };
    });
  } catch {
    return [];
  }
}
