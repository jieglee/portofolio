"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import {
    type GithubContributionDay,
    type GithubStats,
    GITHUB_USERNAME,
    computeStats,
    groupByWeek,
    LEVEL_COLORS,
} from "@/common/constants/github";

const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function GithubContributions() {
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

    // Determine which weeks should show a month label
    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
        const firstValidDay = week.find((d) => d.date);
        if (!firstValidDay) return;
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
            monthLabels.push({ label: MONTH_LABELS[month], weekIndex: wi });
            lastMonth = month;
        }
    });

    return (
        <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Github className="w-5 h-5 text-foreground" />
                        <h3 className="font-semibold text-foreground text-base">
                            GitHub Contributions
                        </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        My GitHub activity over the past year.
                    </p>
                </div>
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    @{GITHUB_USERNAME}
                </a>
            </div>

            {error ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                    Couldn&apos;t load GitHub data right now.
                </p>
            ) : (
                <>
                    {/* Stat cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Total", value: stats?.total },
                            { label: "This Week", value: stats?.thisWeek },
                            { label: "Best", value: stats?.best },
                            { label: "Average", value: stats?.average, suffix: " / days" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl border border-border bg-muted/30 px-4 py-3 flex flex-col items-center justify-center gap-1"
                            >
                                <span className="text-xs text-muted-foreground">{item.label}</span>
                                {loading ? (
                                    <div className="h-6 w-10 rounded bg-muted animate-pulse" />
                                ) : (
                                    <span className="text-xl font-bold" style={{ color: "var(--gh-level-4)" }}>
                                        {item.value ?? 0}
                                        {item.suffix && (
                                            <span className="text-xs text-muted-foreground font-normal">
                                                {item.suffix}
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex gap-1">
                                {Array.from({ length: 52 }).map((_, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        {Array.from({ length: 7 }).map((_, j) => (
                                            <div
                                                key={j}
                                                className="w-2.5 h-2.5 rounded-sm bg-muted animate-pulse"
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="min-w-[640px]">
                                {/* Month labels */}
                                <div className="flex gap-1 mb-1 relative h-4">
                                    {monthLabels.map((m) => (
                                        <span
                                            key={`${m.label}-${m.weekIndex}`}
                                            className="absolute text-xs text-muted-foreground"
                                            style={{ left: `${m.weekIndex * 13}px` }}
                                        >
                                            {m.label}
                                        </span>
                                    ))}
                                </div>

                                {/* Grid */}
                                <div className="flex gap-1">
                                    {weeks.map((week, wi) => (
                                        <div key={wi} className="flex flex-col gap-1">
                                            {week.map((day, di) => (
                                                <motion.div
                                                    key={`${wi}-${di}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2, delay: (wi * 7 + di) * 0.0015 }}
                                                    title={
                                                        day.date
                                                            ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`
                                                            : undefined
                                                    }
                                                    className="w-2.5 h-2.5 rounded-sm"
                                                    style={{
                                                        background:
                                                            day.count < 0
                                                                ? "transparent"
                                                                : LEVEL_COLORS[day.level],
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Less</span>
                        {LEVEL_COLORS.map((color, i) => (
                            <div
                                key={i}
                                className="w-2.5 h-2.5 rounded-sm"
                                style={{ background: color }}
                            />
                        ))}
                        <span>More</span>
                    </div>
                </>
            )}
        </div>
    );
}