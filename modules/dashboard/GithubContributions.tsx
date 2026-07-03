"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    type GithubContributionDay,
    type GithubStats,
    GITHUB_USERNAME,
    computeStats,
    groupByWeek,
    LEVEL_COLORS,
} from "@/common/constants/github";

const MONTH_KEYS = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
];

function HeartCell({
    color,
    size = 10,
    className = "",
}: {
    color: string;
    size?: number;
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
            style={{ display: "block" }}
        >
            <path
                d="M12 21s-7.5-4.7-10.2-9.3C-0.1 8 1.4 4 5.4 3.1 7.9 2.5 10.3 3.7 12 6c1.7-2.3 4.1-3.5 6.6-2.9 4 0.9 5.5 4.9 3.6 8.6C19.5 16.3 12 21 12 21z"
                fill={color}
            />
        </svg>
    );
}

export default function GithubContributions() {
    const t = useTranslations("Dashboard.Github");
    const [days, setDays] = useState<GithubContributionDay[]>([]);
    const [stats, setStats] = useState<GithubStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/github?username=${GITHUB_USERNAME}`);
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                const contributions: GithubContributionDay[] = data.contributions || [];
                setDays(contributions);
                setStats(computeStats(contributions));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const weeks = groupByWeek(days);

    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
        const firstValidDay = week.find((d) => d.date);
        if (!firstValidDay) return;
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
            monthLabels.push({ label: t(`months.${MONTH_KEYS[month]}`), weekIndex: wi });
            lastMonth = month;
        }
    });

    return (
        <div className="bg-white dark:bg-[#0D0D12] border-4 border-black dark:border-[#E9D5FF] p-5 flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#C77DFF]">
            
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4 border-b-4 border-black dark:border-white pb-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-black dark:bg-[#FF4DA6] p-1.5 border border-black text-white">
                            <Github className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-marker text-xl md:text-2xl text-black dark:text-white tracking-wide uppercase">
                            {t("title")}
                        </h3>
                    </div>
                    <p className="text-xs font-bold uppercase italic text-muted-foreground mt-1">
                        {t("subtitle")}
                    </p>
                </div>
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black text-sm bg-[#22D3EE] text-black border-2 border-black px-3 py-1 transform -skew-x-12 shadow-[3px_3px_0px_0px_#000] hover:bg-[#FF4DA6] hover:text-white transition-colors"
                >
                    <span className="inline-block transform skew-x-12">@{GITHUB_USERNAME}</span>
                </a>
            </div>

            {error ? (
                <p className="text-sm font-bold uppercase tracking-wider text-center py-8 text-muted-foreground">
                    {t("error")}
                </p>
            ) : (
                <>
                    {/* Stat Cards Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: t("total"), value: stats?.total, accent: "#FF4DA6" },
                            { label: t("thisWeek"), value: stats?.thisWeek, accent: "#60A5FA" },
                            { label: t("best"), value: stats?.best, accent: "#22D3EE" },
                            { label: t("average"), value: stats?.average, suffix: ` / ${t("days")}`, accent: "#C77DFF" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="border-4 border-black dark:border-white bg-white dark:bg-[#31313F] px-4 py-3 flex flex-col items-center justify-center gap-1 transform hover:-skew-y-2 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                style={{ borderColor: "black" }}
                            >
                                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">{item.label}</span>
                                {loading ? (
                                    <div className="h-6 w-12 rounded-none bg-muted animate-pulse mt-1" />
                                ) : (
                                    <span className="text-2xl font-marker" style={{ color: item.accent }}>
                                        {item.value ?? 0}
                                        {item.suffix && (
                                            <span className="text-xs text-muted-foreground font-sans font-bold uppercase tracking-tight">
                                                {item.suffix}
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap Area */}
                    <div className="overflow-x-auto p-2 border-2 border-dashed border-black/30 dark:border-white/30 bg-white dark:bg-[#1C1C24]">
                        {loading ? (
                            <div className="flex gap-1 justify-center py-4">
                                {Array.from({ length: 35 }).map((_, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        {Array.from({ length: 7 }).map((_, j) => (
                                            <HeartCell
                                                key={j}
                                                color="rgba(0,0,0,0.1)"
                                                className="animate-pulse"
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="min-w-[660px] mx-auto p-1">
                                {/* Month labels row */}
                                <div className="flex gap-1 mb-2 relative h-4">
                                    {monthLabels.map((m) => (
                                        <span
                                            key={`${m.label}-${m.weekIndex}`}
                                            className="absolute text-[10px] font-black uppercase tracking-tight text-muted-foreground"
                                            style={{ left: `${m.weekIndex * 13}px` }}
                                        >
                                            {m.label}
                                        </span>
                                    ))}
                                </div>

                                {/* Heatmap Grid */}
                                <div className="flex gap-1">
                                    {weeks.map((week, wi) => (
                                        <div key={wi} className="flex flex-col gap-1">
                                            {week.map((day, di) => (
                                                <motion.div
                                                    key={`${wi}-${di}`}
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.15, delay: (wi * 7 + di) * 0.001 }}
                                                    title={
                                                        day.date
                                                            ? t("tooltip", { count: day.count, date: day.date })
                                                            : undefined
                                                    }
                                                    className="hover:scale-130 transition-transform cursor-pointer"
                                                >
                                                    <HeartCell
                                                        color={
                                                            day.count < 0 ? "transparent" : LEVEL_COLORS[day.level]
                                                        }
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Legend Footer */}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-t-2 border-dashed border-black/20 pt-2">
                        <span>{t("less")}</span>
                        <div className="flex items-center gap-1">
                            {LEVEL_COLORS.map((color, i) => (
                                <HeartCell key={i} color={color} size={12} />
                            ))}
                        </div>
                        <span>{t("more")}</span>
                    </div>
                </>
            )}
        </div>
    );
}