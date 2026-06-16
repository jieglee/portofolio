"use client";

import { useState } from "react";
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
        <div className="flex flex-col gap-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {loading ? (
                        <span className="inline-block w-24 h-4 rounded bg-muted animate-pulse" />
                    ) : (
                        <>Showing <span className="text-foreground font-medium">{items.length}</span> posts</>
                    )}
                </p>

                <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-0.5">
                    {([
                        { key: "views" as const, label: "Most Views" },
                        { key: "likes" as const, label: "Most Likes" },
                        { key: "comments" as const, label: "Most Comments" },
                        { key: "newest" as const, label: "Newest" },
                        { key: "oldest" as const, label: "Oldest" },
                    ]).map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setSort(sort === opt.key ? null : opt.key)}
                            disabled={loading}
                            className="relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 disabled:opacity-40"
                            style={{
                                color: sort === opt.key ? "var(--foreground)" : "var(--muted-foreground)",
                                background: sort === opt.key ? "var(--background)" : "transparent",
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${platform}-${sort}-${loading}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`grid gap-3 ${
                        isVertical
                            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                    }`}
                >
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => (
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
            className="rounded-xl overflow-hidden border border-border bg-muted/20 animate-pulse"
            style={{ aspectRatio: isVertical ? "9/16" : "1/1" }}
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
            className="group relative rounded-xl overflow-hidden border border-border bg-muted/20 block"
            style={{ aspectRatio: isVertical ? "9/16" : "1/1" }}
        >
            {/* Thumbnail */}
            <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Play icon center (TikTok) */}
            {isVertical && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                </div>
            )}

            {/* Overlay */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 gap-2"
            >
                <p className="text-white text-xs font-medium leading-snug line-clamp-2">{item.title}</p>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-white/80 text-xs">
                        <Eye className="w-3 h-3" />
                        {item.views}
                    </span>
                    <span className="flex items-center gap-1 text-white/80 text-xs">
                        <Heart className="w-3 h-3" />
                        {item.likes}
                    </span>
                    <ExternalLink className="w-3 h-3 text-white/60 ml-auto" />
                </div>
            </motion.div>
        </motion.a>
    );
}