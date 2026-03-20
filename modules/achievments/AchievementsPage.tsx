"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MotionConfig } from "framer-motion";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import AchievementCard from "../achievments/Achievementcard";
import AchievementModal from "../achievments/Achievementmodal";

export type Achievement = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    credential: string;
    link?: string;
    type: string;
    category: string;
    image: string;
    tags: string[];
};

const achievements: Achievement[] = [
    {
        id: 1,
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding",
        date: "November 2024",
        credential: "2VX3R7DL3ZYQ",
        link: "https://www.dicoding.com/certificates/2VX3R7DL3ZYQ",
        type: "Certificate",
        category: "Web Development",
        image: "/images/sertifikat-dicoding-1.png",
        tags: ["Web", "Programming"],
    },
    {
        id: 2,
        title: "Software Engineering Level Test X",
        issuer: "SMK Taruna Bhakti",
        date: "Juni 2025",
        credential: "",
        type: "Certificate",
        category: "Software Engineering",
        image: "/images/sertifikat-uji-level-x.jpeg",
        tags: ["RPL", "Software Engineering"],
    },
];

export default function AchievementsPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Achievement | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const isDark = mounted && resolvedTheme === "dark";

    const filtered = achievements.filter(
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
            <div className="px-6 py-10 lg:px-12">
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                    Achievements
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    A collection of certificates and badges I have earned throughout my
                    professional and academic journey.
                </p>

                <div className="my-6 border-t border-dashed border-border" />

                {/* Search */}
                <div className="relative w-64">
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
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                    Total: {filtered.length}
                </p>

                {/* Grid */}
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((item) =>
                        isDark ? (
                            <SpotlightCard
                                key={item.id}
                                className="!p-0 !rounded-2xl !bg-neutral-900 !border-neutral-800"
                                spotlightColor="rgba(255, 255, 255, 0.15)"
                            >
                                <AchievementCard item={item} onShowDetail={openModal} />
                            </SpotlightCard>
                        ) : (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
                            >
                                <AchievementCard item={item} onShowDetail={openModal} />
                            </div>
                        )
                    )}
                </div>

                <AchievementModal selected={selected} onClose={closeModal} />
            </div>
        </MotionConfig>
    );
}