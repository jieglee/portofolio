"use client";
import { motion } from "framer-motion";
import { Achievement } from "./AchievementsPage";

interface AchievementCardProps {
    item: Achievement;
    onShowDetail: (item: Achievement, e: React.MouseEvent) => void;
}

export default function AchievementCard({ item, onShowDetail }: AchievementCardProps) {
    return (
        <motion.a
            layoutId={`card-${item.id}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl"
            style={{ borderRadius: 16 }}
            onClick={(e) => onShowDetail(item, e)}
        >
            {/* Image */}
            <motion.div
                layoutId={`card-image-${item.id}`}
                className="relative h-44 w-full overflow-hidden bg-muted"
                style={{ borderRadius: "16px 16px 0 0" }}
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-[0.4]"
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Type badge */}
                <motion.span
                    layoutId={`card-type-${item.id}`}
                    className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
                >
                    {item.type}
                </motion.span>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                        Show Details
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Issuer + credential pinned bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <motion.span layoutId={`card-issuer-${item.id}`} className="text-xs font-medium text-white/80">
                        {item.issuer}
                    </motion.span>
                    <span className="font-mono text-[10px] text-white/50">{item.credential}</span>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div layoutId={`card-content-${item.id}`} className="flex flex-col gap-3 p-4 bg-card">
                <motion.h3
                    layoutId={`card-title-${item.id}`}
                    className="line-clamp-2 text-sm font-semibold leading-snug text-foreground"
                >
                    {item.title}
                </motion.h3>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-[10px] text-muted-foreground">
                        {item.date}
                    </span>
                </div>
            </motion.div>

            {/* Bottom accent bar */}
            <div className="h-0.5 w-0 bg-gradient-to-r from-foreground/40 to-foreground/10 transition-all duration-500 group-hover:w-full" />
        </motion.a>
    );
}