"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
    type Platform,
    type ContentItem,
    type SocialStats,
    SOCIAL_STATS,
    CONTENT_ITEMS,
} from "@/common/constants/creations";
import { useCreationsStore } from "@/common/stores/creations";
import PlatformTabs from "./PlatformTabs";
import StatsCard from "./StatsCard";
import ContentGrid from "./ContentGrid";

export default function CreationsPage() {
    const t = useTranslations("Creations");
    const [platform, setPlatform] = useState<Platform>("tiktok");

    const {
        tiktokVideos,
        tiktokStats,
        igPosts,
        igStats,
        tiktokLoading,
        igLoading,
        fetchTikTok,
        fetchInstagram,
    } = useCreationsStore();

    useEffect(() => {
        fetchTikTok();
        fetchInstagram();
    }, [fetchTikTok, fetchInstagram]);

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

    return (
        <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">{t("title")}</h1>
                <p className="text-sm text-muted-foreground">
                    {t("subtitle")}
                </p>
            </div>

            <div className="h-px w-full border-t border-dashed border-border" />

            {/* Platform Tabs */}
            <div className="sticky top-16 z-10 bg-background -mx-4 px-4 pb-1 sm:-mx-6 sm:px-6 lg:top-0">
                <PlatformTabs active={platform} onChange={setPlatform} />
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
