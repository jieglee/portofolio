"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { type Platform, type SocialStats } from "@/common/constants/creations";

interface StatsCardProps {
    platform: Platform;
    stats: SocialStats;
}

const statItems = (stats: SocialStats) => [
    { label: "Followers", value: stats.followers },
    { label: "Following", value: stats.following },
    { label: "Likes", value: stats.likes },
    { label: "Total Views", value: stats.totalViews },
    { label: "Total Comments", value: stats.totalComments },
    { label: "Total Shares", value: stats.totalShares },
];

const platformConfig: Record<Platform, { label: string; color: string; bg: string }> = {
    tiktok: {
        label: "Open TikTok",
        color: "#ffffff",
        bg: "#010101",
    },
    instagram: {
        label: "Open Instagram",
        color: "#ffffff",
        bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    },
};

export default function StatsCard({ platform, stats }: StatsCardProps) {
    const config = platformConfig[platform];
    const items = statItems(stats);

    return (
        <motion.div
            key={platform}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-5"
        >
            {/* Profile row */}
            <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                    <Image
                        src={stats.avatar}
                        alt={stats.displayName}
                        width={64}
                        height={64}
                        className="rounded-full object-cover w-16 h-16"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-foreground text-base leading-tight">
                            @{stats.username}
                        </span>
                        <span className="text-muted-foreground text-sm">{stats.displayName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1">
                        {stats.bio}
                    </p>
                </div>

                {/* CTA button */}
                <a
                    href={stats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                        background: config.bg,
                        color: config.color,
                    }}
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {config.label}
                </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Stats grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {items.map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                        <span className="text-lg font-bold text-foreground tracking-tight">
                            {item.value}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}