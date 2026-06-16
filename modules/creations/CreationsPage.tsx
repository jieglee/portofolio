"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    type Platform,
    type ContentItem,
    type SocialStats,
    SOCIAL_STATS,
    CONTENT_ITEMS,
} from "@/common/constants/creations";
import PlatformTabs from "./PlatformTabs";
import StatsCard from "./StatsCard";
import ContentGrid from "./ContentGrid";

export default function CreationsPage() {
    const [platform, setPlatform] = useState<Platform>("tiktok");

    // TikTok live data state
    const [tiktokVideos, setTiktokVideos] = useState<ContentItem[] | null>(null);
    const [tiktokStats, setTiktokStats] = useState<SocialStats | null>(null);
    const [tiktokLoading, setTiktokLoading] = useState(false);
    const [tiktokError, setTiktokError] = useState<string | null>(null);

    // Instagram live data state
    const [igPosts, setIgPosts] = useState<ContentItem[] | null>(null);
    const [igStats, setIgStats] = useState<SocialStats | null>(null);
    const [igLoading, setIgLoading] = useState(false);
    const [igError, setIgError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTikTok = async () => {
            setTiktokLoading(true);
            setTiktokError(null);
            try {
                const res = await fetch("/api/tiktok");
                if (!res.ok) throw new Error("Gagal fetch TikTok data");
                const data = await res.json();

                if (data.videos?.length) setTiktokVideos(data.videos);
                if (data.stats) {
                    setTiktokStats({
                        ...SOCIAL_STATS.tiktok,
                        ...Object.fromEntries(
                            Object.entries(data.stats).filter(([, v]) => v !== "" && v !== null && v !== undefined)
                        ),
                    });
                }
            } catch (e: any) {
                console.warn("[CreationsPage] TikTok fetch failed, using static data:", e.message);
                setTiktokError(e.message);
            } finally {
                setTiktokLoading(false);
            }
        };

        const fetchInstagram = async () => {
            setIgLoading(true);
            setIgError(null);
            try {
                const res = await fetch("/api/instagram");
                if (!res.ok) throw new Error("Gagal fetch Instagram data");
                const data = await res.json();

                if (data.posts?.length) setIgPosts(data.posts);
                if (data.stats) {
                    setIgStats({
                        ...SOCIAL_STATS.instagram,
                        ...Object.fromEntries(
                            Object.entries(data.stats).filter(([, v]) => v !== "" && v !== null && v !== undefined)
                        ),
                    });
                }
            } catch (e: any) {
                console.warn("[CreationsPage] Instagram fetch failed, using static data:", e.message);
                setIgError(e.message);
            } finally {
                setIgLoading(false);
            }
        };

        fetchTikTok();
        fetchInstagram();
    }, []);

    // Resolve data berdasarkan platform
    const stats: SocialStats =
        platform === "tiktok" && tiktokStats
            ? tiktokStats
            : platform === "instagram" && igStats
              ? igStats
              : SOCIAL_STATS[platform];

    const items: ContentItem[] =
        platform === "tiktok" && tiktokVideos
            ? tiktokVideos
            : platform === "instagram" && igPosts
              ? igPosts
              : CONTENT_ITEMS.filter((c) => c.platform === platform);

    const loading = platform === "tiktok" ? tiktokLoading : igLoading;
    const platformError = platform === "tiktok" ? tiktokError : igError;

    return (
        <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">Creations</h1>
                <p className="text-sm text-muted-foreground">
                    A collection of my coding content and creative works.
                </p>
            </div>

            <div className="h-px w-full border-t border-dashed border-border" />

            {/* Platform Tabs */}
            <PlatformTabs active={platform} onChange={setPlatform} />

            {/* Live indicator */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {loading ? (
                    <>
                        <span className="size-2 rounded-full bg-yellow-400 animate-pulse" />
                        <span>Loading live data...</span>
                    </>
                ) : platformError ? (
                    <>
                        <span className="size-2 rounded-full bg-red-400" />
                        <span>Using cached data</span>
                    </>
                ) : (platform === "tiktok" && tiktokVideos) || (platform === "instagram" && igPosts) ? (
                    <>
                        <span className="size-2 rounded-full bg-green-400" />
                        <span>Live from {platform === "tiktok" ? "TikTok" : "Instagram"}</span>
                    </>
                ) : null}
            </div>

            {/* Stats Card */}
            <AnimatePresence mode="wait">
                <StatsCard key={`stats-${platform}`} platform={platform} stats={stats} />
            </AnimatePresence>

            {/* Content Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`grid-${platform}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ContentGrid items={items} platform={platform} loading={loading} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}