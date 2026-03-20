"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Achievement } from "./AchievementsPage";

interface AchievementModalProps {
    selected: Achievement | null;
    onClose: () => void;
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
            </span>
            <span className={`text-sm font-medium text-foreground ${mono ? "font-mono text-xs" : ""}`}>
                {value}
            </span>
        </div>
    );
}

export default function AchievementModal({ selected, onClose }: AchievementModalProps) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    return (
        <AnimatePresence>
            {selected && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    {/* Centering wrapper */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        {/* Modal expand dari card pakai layoutId */}
                        <motion.div
                            layoutId={`card-${selected.id}`}
                            className="relative flex w-full max-w-2xl flex-col overflow-hidden border border-border bg-card shadow-2xl md:flex-row pointer-events-auto"
                            style={{ borderRadius: 24 }}
                        >
                            {/* LEFT: image */}
                            <motion.div
                                layoutId={`card-image-${selected.id}`}
                                className="relative w-full overflow-hidden md:w-[52%] md:flex-shrink-0"
                                style={{ borderRadius: "24px 0 0 24px" }}
                            >
                                <div className="flex h-full min-h-[220px] items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-5 md:min-h-[380px]">
                                    <img
                                        src={selected.image}
                                        alt={selected.title}
                                        className="h-full w-full rounded-xl object-contain drop-shadow-xl"
                                    />
                                </div>

                                {/* Type badge */}
                                <motion.span
                                    layoutId={`card-type-${selected.id}`}
                                    className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
                                >
                                    {selected.type}
                                </motion.span>

                                {/* Issuer */}
                                <div className="absolute bottom-3 left-3 right-3">
                                    <motion.span
                                        layoutId={`card-issuer-${selected.id}`}
                                        className="text-xs font-medium text-white/80"
                                    >
                                        {selected.issuer}
                                    </motion.span>
                                </div>
                            </motion.div>

                            {/* RIGHT: detail panel fade in setelah expand */}
                            <motion.div
                                className="flex flex-1 flex-col overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, delay: 0.15 }}
                            >
                                {/* Header */}
                                <div className="relative border-b border-border p-5 pb-4">
                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-border hover:text-foreground"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M18 6 6 18M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <span className="mb-2 inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                        {selected.type}
                                    </span>

                                    <motion.h2
                                        layoutId={`card-title-${selected.id}`}
                                        className="pr-8 text-base font-bold leading-snug text-foreground"
                                    >
                                        {selected.title}
                                    </motion.h2>
                                    <p className="mt-1 text-sm text-muted-foreground">{selected.issuer}</p>
                                </div>

                                {/* Details stagger */}
                                <div className="flex flex-1 flex-col gap-4 p-5">
                                    <motion.div
                                        className="grid grid-cols-2 gap-x-4 gap-y-4"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={{
                                            hidden: {},
                                            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
                                        }}
                                    >
                                        {[
                                            { label: "Credential ID", value: selected.credential, mono: true },
                                            { label: "Issue Date", value: selected.date },
                                            { label: "Type", value: selected.type },
                                            { label: "Category", value: selected.category },
                                        ].map((row) => (
                                            <motion.div
                                                key={row.label}
                                                variants={{
                                                    hidden: { opacity: 0, y: 8 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                            >
                                                <DetailRow label={row.label} value={row.value} mono={row.mono} />
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-wrap gap-1.5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.38, duration: 0.25 }}
                                    >
                                        {selected.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Footer CTA */}
                                <motion.div
                                    className="border-t border-border p-4"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.22, type: "spring", stiffness: 260, damping: 22 }}
                                >
                                    <a
                                        href={selected.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-80"
                                    >
                                        View Certificate
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}