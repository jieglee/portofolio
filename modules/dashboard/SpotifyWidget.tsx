"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Disc3 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SpotifyTrack } from "@/common/constants/dashboard";

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function SpotifyWidget() {
  const t = useTranslations("Dashboard.Spotify");
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        setTrack(data);
      } catch {
        setTrack({
          isPlaying: false,
          title: "Unavailable",
          artist: "—",
          album: "",
          albumImageUrl: "",
          songUrl: "",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const progress = track?.progress_ms ?? 0;
  const duration = track?.duration_ms ?? 1;
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {t("title")}
          </span>
        </div>
        {track?.isPlaying && (
          <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {t("playing")}
          </span>
        )}
      </div>

      {/* Track Info */}
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-3.5 w-28 rounded bg-muted animate-pulse" />
            <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ) : track ? (
        <div className="flex items-center gap-3">
          {track.albumImageUrl ? (
            <img
              src={track.albumImageUrl}
              alt={track.album}
              className="w-12 h-12 rounded-lg border border-border object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
              <Disc3 className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            {track.songUrl ? (
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground truncate hover:underline"
              >
                {track.title}
              </a>
            ) : (
              <span className="text-sm font-medium text-foreground truncate">
                {track.title}
              </span>
            )}
            <span className="text-xs text-muted-foreground truncate">
              {track.artist}
            </span>
          </div>
        </div>
      ) : null}

      {/* Progress Bar */}
      {!loading && track?.isPlaying && track.duration_ms && (
        <div className="flex flex-col gap-1">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Not Playing State */}
      {!loading && track && !track.isPlaying && (
        <div className="flex items-center gap-2 py-2">
          <Disc3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{t("notPlaying")}</span>
        </div>
      )}
    </div>
  );
}
