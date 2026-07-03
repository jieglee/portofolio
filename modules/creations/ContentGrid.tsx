"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Eye, Heart, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type ContentItem, type Platform } from "@/common/constants/creations";

type SortOption = "views" | "likes" | "comments" | "newest" | "oldest" | null;

interface ContentGridProps {
    items: ContentItem[];
    platform: Platform;
    loading?: boolean;
}

function parseNum(val: string): number {
    const clean = val.replace(/,/g, "").toUpperCase();
    if (clean.endsWith("M")) return parseFloat(clean) * 1_000_000;
    if (clean.endsWith("K")) return parseFloat(clean) * 1_000;
    return parseFloat(clean) || 0;
}

export default function ContentGrid({ items, platform, loading = false }: ContentGridProps) {
    const t = useTranslations("Creations");
    const [sort, setSort] = useState<SortOption>(null);

    const sorted = sort
        ? [...items].sort((a, b) => {
              if (sort === "views") return parseNum(b.views) - parseNum(a.views);
              if (sort === "likes") return parseNum(b.likes) - parseNum(a.likes);
              if (sort === "comments") return parseNum(b.comments ?? "0") - parseNum(a.comments ?? "0");
              if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
              if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
              return 0;
          })
        : items;

    const isVertical = platform === "tiktok";

    return (
        <div className="flex flex-col gap-6">
            {/* Toolbar Panel Bergaya Komik */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-[#0D0D12] border-4 border-black dark:border-[#E9D5FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm font-bold uppercase tracking-wider dark:text-white">
                    {loading ? (
                        <span className="inline-block w-24 h-4 rounded bg-muted animate-pulse" />
                    ) : (
                        <>{t("showing", { count: items.length })}</>
                    )}
                </p>

                {/* Navigasi Filter/Sortir Miring (Skewed) */}
                <div className="flex flex-wrap items-center gap-1">
                    {([
                        { key: "views" as const, label: t("sort_views") },
                        { key: "likes" as const, label: t("sort_likes") },
                        { key: "comments" as const, label: t("sort_comments") },
                        { key: "newest" as const, label: t("sort_newest") },
                        { key: "oldest" as const, label: t("sort_oldest") },
                    ]).map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setSort(sort === opt.key ? null : opt.key)}
                            disabled={loading}
                            className="relative px-3 py-1 text-xs font-black uppercase tracking-tight border-2 border-black transition-all duration-150 disabled:opacity-40 transform -skew-x-6"
                            style={{
                                color: sort === opt.key ? "white" : "var(--muted-foreground)",
                                background: sort === opt.key ? "#FF4DA6" : "transparent",
                                boxShadow: sort === opt.key ? "2px_2px_0px_0px_#000" : "none"
                            }}
                        >
                            <span className="inline-block transform skew-x-6">{opt.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Render */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${platform}-${sort}-${loading}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`grid gap-6 ${
                        isVertical
                            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                    }`}
                >
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                              <SkeletonCard key={i} isVertical={isVertical} />
                          ))
                        : sorted.map((item, i) => (
                              <ContentCard key={item.id} item={item} index={i} isVertical={isVertical} />
                          ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function SkeletonCard({ isVertical }: { isVertical: boolean }) {
    return (
        <div
            className="rounded-none border-4 border-black bg-white dark:bg-[#31313F] p-3 pb-12 animate-pulse shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            style={{ aspectRatio: isVertical ? "9/14" : "1/1.2" }}
        />
    );
}

function ContentCard({
    item,
    index,
    isVertical,
}: {
    item: ContentItem;
    index: number;
    isVertical: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    
    // Memberikan rotasi dinamis bergantian agar terlihat seperti tempelan manual foto polaroid asli
    const rotateClass = index % 2 === 0 ? "hover:rotate-1 rotate-[-1.5deg]" : "hover:rotate-[-1] rotate-[1.5deg]";

    return (
        <motion.a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={`group relative rounded-none border-4 border-black bg-white text-black p-3 pb-10 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_#60A5FA] block ${rotateClass}`}
            style={{ aspectRatio: isVertical ? "9/14" : "1/1.2" }}
        >
            {/* Ornamen Perekat/Selotip Polaroid di Atas Card */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#60A5FA]/40 dark:bg-[#22D3EE]/50 backdrop-blur-xs border border-black/20 transform -rotate-1 z-20 pointer-events-none" />

            {/* Area Gambar */}
            <div className="relative w-full h-[82%] border-2 border-black overflow-hidden bg-black">
                <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Ikon Play Khusus TikTok */}
                {isVertical && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
                        <div className="w-12 h-12 rounded-full bg-[#FF4DA6] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                    </div>
                )}

                {/* Info Overlay Saat Hover */}
                <motion.div
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 gap-2"
                >
                    <p className="text-white text-xs font-bold leading-snug line-clamp-2">{item.title}</p>
                    <div className="flex items-center gap-3 border-t border-white/20 pt-1.5">
                        <span className="flex items-center gap-1 text-white/90 text-[11px] font-bold">
                            <Eye className="w-3 h-3 text-[#22D3EE]" />
                            {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-white/90 text-[11px] font-bold">
                            <Heart className="w-3 h-3 text-[#FF4DA6]" />
                            {item.likes}
                        </span>
                        <ExternalLink className="w-3 h-3 text-white/70 ml-auto" />
                    </div>
                </motion.div>
            </div>

            {/* Bagian Bawah Caption Khas Polaroid */}
            <div className="mt-3 text-center">
                <span className="font-marker text-xs tracking-wider uppercase text-black block truncate px-1">
                    {item.title || "CREATION WORK"}
                </span>
            </div>
        </motion.a>
    );
}