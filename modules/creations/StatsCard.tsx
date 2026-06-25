"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { type Platform, type SocialStats } from "@/common/constants/creations";

interface StatsCardProps {
    platform: Platform;
    stats: SocialStats;
}

const platformConfig: Record<Platform, { color: string; bg: string }> = {
    tiktok: {
        color: "#ffffff",
        bg: "#010101",
    },
    instagram: {
        color: "#ffffff",
        bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    },
};

export default function StatsCard({ platform, stats }: StatsCardProps) {
    const t = useTranslations("Creations");
    const config = platformConfig[platform];

    const items = [
        { label: t("stat_followers"), value: stats.followers },
        { label: t("stat_following"), value: stats.following },
        { label: t("stat_likes"), value: stats.likes },
        { label: t("stat_views"), value: stats.totalViews },
        { label: t("stat_comments"), value: stats.totalComments },
        { label: t("stat_shares"), value: stats.totalShares },
    ];

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
                <div className="relative shrink-0 w-16 h-16">
                    {stats.avatar ? (
                        <Image
                            src={stats.avatar}
                            alt={stats.displayName}
                            fill
                            loading="eager"
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-semibold">
                            {stats.displayName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                    )}
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
                    {platform === "tiktok" ? t("btn_tiktok") : t("btn_instagram")}
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