"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MotionConfig, motion, Variants } from "framer-motion";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import AchievementCard from "../achievments/Achievementcard";
import AchievementModal from "../achievments/Achievementmodal";
import { achievements, type Achievement } from "@/common/constants/achievements";


// Sort by date descending (terbaru duluan)
function parseDate(dateStr: string): number {
    const months: Record<string, number> = {
        januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
        juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
        january: 0, february: 1, march: 2, april2: 3, may: 4, june: 5,
        july: 6, august: 7, september2: 8, october: 9, november2: 10, december: 11,
    };
    const parts = dateStr.toLowerCase().split(" ");
    const month = months[parts[0]] ?? 0;
    const year = parseInt(parts[1]) || 0;
    return year * 100 + month;
}

const sortedAchievements = [...achievements].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
);

const pageContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const pageItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const gridContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardItem: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function AchievementsPage() {
    const { resolvedTheme } = useTheme();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Achievement | null>(null);

    const isDark = resolvedTheme === "dark";

    const filtered = sortedAchievements.filter(
        (a) =>
            a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.issuer.toLowerCase().includes(search.toLowerCase()) ||
            a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    const openModal = (item: Achievement, e: React.MouseEvent) => {
        e.preventDefault();
        setSelected(item);
    };

    const closeModal = () => setSelected(null);

    return (
        <MotionConfig transition={{ type: "spring", stiffness: 280, damping: 26 }}>
            <motion.div
                className="px-6 py-10 lg:px-12"
                variants={pageContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={pageItem}>
                    <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                        Achievements
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        A collection of certificates and badges I have earned throughout my
                        professional and academic journey.
                    </p>
                </motion.div>

                <motion.div variants={pageItem} className="my-6 border-t border-dashed border-border" />

                <motion.div variants={pageItem} className="relative w-64">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </motion.div>

                <motion.p variants={pageItem} className="mt-4 text-sm text-muted-foreground">
                    Total: {filtered.length}
                </motion.p>

                <motion.div
                    className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={gridContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {filtered.map((item) => (
                        <motion.div key={item.id} variants={cardItem}>
                            {isDark ? (
                                <SpotlightCard
                                    className="!p-0 !rounded-2xl !bg-neutral-900 !border-neutral-800"
                                    spotlightColor="rgba(255, 255, 255, 0.15)"
                                >
                                    <AchievementCard item={item} onShowDetail={openModal} />
                                </SpotlightCard>
                            ) : (
                                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
                                    <AchievementCard item={item} onShowDetail={openModal} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <AchievementModal selected={selected} onClose={closeModal} />
            </motion.div>
        </MotionConfig>
    );
}