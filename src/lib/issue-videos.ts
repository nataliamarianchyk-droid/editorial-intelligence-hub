export type IssueVideo = {
  youtubeId: string;
  title: string;
  description: string;
  durationSeconds: number;
  publishedAt: string;
};

export const issueVideos: Record<string, IssueVideo> = {
  "visibility-is-not-pipeline": {
    youtubeId: "mZlnyETenXk",
    title: "Visibility Is Not Pipeline: 4 Gaps That Cost B2B Revenue",
    description: "A 75-second summary of Issue 01: the four structural gaps between marketing visibility and revenue in specialist B2B markets.",
    durationSeconds: 75,
    publishedAt: "2026-11-25T16:52:24+01:00",
  },
};

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export const isValidYoutubeId = (id: string): boolean => YOUTUBE_ID.test(id);

/** Bare embed URL for structured data: VideoObject.embedUrl must not carry player params. */
export function youtubeEmbedBaseUrl(id: string): string | null {
  return isValidYoutubeId(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

export function youtubeEmbedUrl(id: string): string | null {
  const base = youtubeEmbedBaseUrl(id);
  return base ? `${base}?autoplay=1&rel=0` : null;
}

export function youtubeWatchUrl(id: string): string | null {
  return isValidYoutubeId(id) ? `https://www.youtube.com/watch?v=${id}` : null;
}

/** Returns the video for a slug only when its id is valid. */
export function issueVideoFor(slug: string): IssueVideo | null {
  const v = issueVideos[slug];
  return v && isValidYoutubeId(v.youtubeId) ? v : null;
}

export const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const isoDuration = (s: number) => `PT${Math.floor(s / 60) ? `${Math.floor(s / 60)}M` : ""}${s % 60 ? `${s % 60}S` : ""}`;
