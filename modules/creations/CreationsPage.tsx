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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch TikTok data sekali saat mount
        const fetchTikTok = async () => {
            setLoading(true);
            setError(null);
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
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTikTok();
    }, []);

    // Resolve data berdasarkan platform
    const stats: SocialStats =
        platform === "tiktok" && tiktokStats
            ? tiktokStats
            : SOCIAL_STATS[platform];

    const items: ContentItem[] =
        platform === "tiktok" && tiktokVideos
            ? tiktokVideos
            : CONTENT_ITEMS.filter((c) => c.platform === platform);

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

            {/* Live indicator buat TikTok */}
            {platform === "tiktok" && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {loading ? (
                        <>
                            <span className="size-2 rounded-full bg-yellow-400 animate-pulse" />
                            <span>Loading live data...</span>
                        </>
                    ) : error ? (
                        <>
                            <span className="size-2 rounded-full bg-red-400" />
                            <span>Using cached data</span>
                        </>
                    ) : tiktokVideos ? (
                        <>
                            <span className="size-2 rounded-full bg-green-400" />
                            <span>Live from TikTok</span>
                        </>
                    ) : null}
                </div>
            )}

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
                    <ContentGrid items={items} platform={platform} loading={loading && platform === "tiktok"} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}