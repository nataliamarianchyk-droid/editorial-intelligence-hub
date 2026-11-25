import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { issueVideoFor, youtubeEmbedUrl, youtubeWatchUrl, formatDuration } from "@/lib/issue-videos";
import { issueCovers } from "@/lib/issue-covers";

export function IssueVideo({ slug }: { slug: string }) {
  const video = issueVideoFor(slug);
  const cover = issueCovers[slug];
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => { if (playing) frameRef.current?.focus(); }, [playing]);
  if (!video) return null;
  const embed = youtubeEmbedUrl(video.youtubeId);
  const watch = youtubeWatchUrl(video.youtubeId);
  if (!embed || !watch) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 mt-10">
      <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-[var(--ink-deep)]/5">
        {playing ? (
          <iframe
            ref={frameRef}
            src={embed}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ink-navy)] focus-visible:ring-offset-2"
          >
            {cover && <img src={cover.src} alt="" width={cover.width} height={cover.height} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 rounded-full bg-[var(--ink-deep)] px-5 py-3 text-sm font-medium text-[var(--paper)] shadow-lg transition-transform group-hover:scale-105">
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                <span>Play video</span>
                <span className="opacity-75">{formatDuration(video.durationSeconds)}</span>
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-deep)]/75">
        Clicking loads the video from YouTube (Google). Personal data may be transferred to Google, including to the USA.{" "}
        <a href="/privacy" className="underline">Privacy policy</a>
        {" · "}
        <a href={watch} target="_blank" rel="noopener noreferrer" className="underline">Watch on YouTube</a>
      </p>
    </section>
  );
}
