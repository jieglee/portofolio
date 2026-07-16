"use client";

import { useEffect, useState, useCallback } from "react";
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

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

interface TooltipData {
    count: number;
    date: string;
    formattedDate: string;
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

    const [tooltip, setTooltip] = useState<TooltipData | null>(null);

    const showTooltip = useCallback((day: GithubContributionDay) => {
        if (!day.date) return;
        setTooltip({
            count: day.count,
            date: day.date,
            formattedDate: formatDate(day.date),
        });
    }, []);

    const hideTooltip = useCallback(() => setTooltip(null), []);

    const weeks = groupByWeek(days);

    // Determine which weeks should show a month label
    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    let lastLabelWeek = -10;
    weeks.forEach((week, wi) => {
        const firstValidDay = week.find((d) => d.date);
        if (!firstValidDay) return;
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
            if (wi - lastLabelWeek >= 2) {
                monthLabels.push({ label: t(`months.${MONTH_KEYS[month]}`), weekIndex: wi });
                lastLabelWeek = wi;
            }
            lastMonth = month;
        }
    });

    return (
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-foreground" />
                <h3 className="text-sm font-semibold text-foreground">
                    {t("title")}
                </h3>
            </div>

            {error ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                    {t("error")}
                </p>
            ) : (
                <>
                    {/* Stat cards */}
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: t("total"), value: stats?.total },
                            { label: t("thisWeek"), value: stats?.thisWeek },
                            { label: t("best"), value: stats?.best },
                            { label: t("average"), value: stats?.average, suffix: ` / ${t("days")}` },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-lg border border-border bg-muted/30 px-3 py-2 flex flex-col items-center justify-center gap-0.5"
                            >
                                <span className="text-[10px] text-muted-foreground">{item.label}</span>
                                {loading ? (
                                    <div className="h-5 w-8 rounded bg-muted animate-pulse" />
                                ) : (
                                    <span className="text-sm font-bold" style={{ color: "var(--gh-level-4)" }}>
                                        {item.value ?? 0}
                                        {item.suffix && (
                                            <span className="text-[10px] text-muted-foreground font-normal">
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
                                            <HeartCell
                                                key={j}
                                                color="var(--muted)"
                                                className="animate-pulse"
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
                                            style={{ left: `${m.weekIndex * 14}px` }}
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
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2, delay: (wi * 7 + di) * 0.0015 }}
                                                    tabIndex={day.date ? 0 : undefined}
                                                    role={day.date ? "gridcell" : undefined}
                                                    aria-label={
                                                        day.date
                                                            ? `${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatDate(day.date)}`
                                                            : undefined
                                                    }
                                                    onMouseEnter={() => showTooltip(day)}
                                                    onMouseLeave={hideTooltip}
                                                    onFocus={() => showTooltip(day)}
                                                    onBlur={hideTooltip}
                                                    className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
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

                    {/* Legend */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <span>{t("less")}</span>
                            {LEVEL_COLORS.map((color, i) => (
                                <HeartCell key={i} color={color} />
                            ))}
                            <span>{t("more")}</span>
                        </div>
                        {tooltip && (
                            <span className="text-foreground transition-opacity duration-200">
                                {tooltip.count}{" "}
                                {tooltip.count === 1 ? "contribution" : "contributions"} on{" "}
                                {tooltip.formattedDate}
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}