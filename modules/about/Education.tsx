"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const educationList = [
    {
        id: 1,
        school: "SMK Taruna Bhakti",
        level: "Senior High School",
        major: "Rekayasa Perangkat Lunak (RPL)",
        year: "2024 — 2027",
        location: "Depok, Indonesia",
        logo: "/images/logo-smk.png",
        current: true,
    },
    {
        id: 2,
        school: "SMP ...",
        level: "Junior High School",
        major: null,
        year: "2020 — 2024",
        location: "Depok, Indonesia",
        logo: "/images/logo-smp.png",
        current: false,
    },
    {
        id: 3,
        school: "SD AL IRSYAD AL ISLAMIYYAH DEPOK",
        level: "Elementary School",
        major: null,
        year: "2014 — 2020",
        location: "Depok, Indonesia",
        logo: "/images/logo-sd.png",
        current: false,
    },
];

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 22 },
    },
};

function EduCardInner({ edu }: { edu: typeof educationList[0] }) {
    return (
        <>
            {/* Top accent bar */}
            <div
                className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-xl transition-all duration-300 ${
                    edu.current ? "bg-foreground" : "bg-border"
                }`}
            />

            {/* Hover glow overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    background:
                        "radial-gradient(circle at 50% 0%, hsl(var(--foreground) / 0.04) 0%, transparent 70%)",
                }}
            />

            {/* Logo + year */}
            <div className="flex items-start justify-between gap-2 mt-1">
                <motion.div
                    className="h-9 w-9 flex-shrink-0 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden text-xs font-medium text-muted-foreground"
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                    <img
                        src={edu.logo}
                        alt={edu.school}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            const t = e.currentTarget;
                            t.style.display = "none";
                            const p = t.parentElement;
                            if (p && !p.querySelector("span")) {
                                const s = document.createElement("span");
                                s.textContent = edu.school.charAt(0);
                                p.appendChild(s);
                            }
                        }}
                    />
                </motion.div>
                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap flex-shrink-0 ${
                        edu.current
                            ? "bg-foreground text-background"
                            : "border border-border bg-muted text-muted-foreground"
                    }`}
                >
                    {edu.year}
                </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground leading-tight">
                    {edu.school}
                </p>
                <p className="text-[11px] text-muted-foreground">{edu.level}</p>
                {edu.major && (
                    <p className="text-[11px] text-foreground">{edu.major}</p>
                )}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {edu.location}
                </div>
                {edu.current && (
                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-50" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
                        </span>
                        Now
                    </span>
                )}
            </div>
        </>
    );
}

export default function Education() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const isDark = mounted && resolvedTheme === "dark";

    return (
        <section>
            {/* Section label */}
            <div className="mb-5 flex items-center gap-3">
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                    Education
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 gap-2.5 sm:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {educationList.map((edu) => (
                    <motion.div
                        key={edu.id}
                        variants={cardVariant}
                        whileHover={{
                            y: -4,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400, damping: 20 },
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isDark ? (
                            <SpotlightCard
                                className={`!p-4 !rounded-xl relative flex flex-col gap-2.5 overflow-hidden cursor-default h-full ${
                                    edu.current
                                        ? "!border-foreground/30"
                                        : "!border-neutral-800"
                                }`}
                                spotlightColor="rgba(255, 255, 255, 0.12)"
                            >
                                <EduCardInner edu={edu} />
                            </SpotlightCard>
                        ) : (
                            <div
                                className={`relative flex flex-col gap-2.5 overflow-hidden rounded-xl border bg-card p-4 cursor-default h-full ${
                                    edu.current ? "border-foreground/30" : "border-border"
                                }`}
                            >
                                <EduCardInner edu={edu} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}