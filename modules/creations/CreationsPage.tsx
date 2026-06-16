"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Platform, SOCIAL_STATS, CONTENT_ITEMS } from "@/common/constants/creations";
import PlatformTabs from "./PlatformTabs";
import StatsCard from "./StatsCard";
import ContentGrid from "./ContentGrid";

export default function CreationsPage() {
    const [platform, setPlatform] = useState<Platform>("tiktok");

    const stats = SOCIAL_STATS[platform];
    const items = CONTENT_ITEMS.filter((c) => c.platform === platform);

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
                    <ContentGrid items={items} platform={platform} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}