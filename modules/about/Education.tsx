"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { GraduationCap } from "lucide-react";

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
        school: "SMPN 3 DEPOK",
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

const container: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 22 },
    },
};

const levelKeys: Record<string, string> = {
    "Senior High School": "level_seniorHigh",
    "Junior High School": "level_juniorHigh",
    "Elementary School": "level_elementary",
};

function SchoolLogo({ edu }: { edu: (typeof educationList)[0] }) {
    const [failed, setFailed] = useState(false);

    return (
        <motion.div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border bg-muted p-1.5 ${
                edu.current ? "border-foreground/30" : "border-border"
            }`}
            whileHover={{ scale: 1.06, rotate: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
            {failed ? (
                <span className="text-xs font-medium text-muted-foreground">
                    {edu.school.charAt(0)}
                </span>
            ) : (
                <img
                    src={edu.logo}
                    alt={edu.school}
                    className="h-full w-full object-contain"
                    onError={() => setFailed(true)}
                />
            )}
        </motion.div>
    );
}

function EduCardInner({ edu }: { edu: (typeof educationList)[0] }) {
    const t = useTranslations("About");
    return (
        <>
            <div
                className={`absolute left-0 right-0 top-0 h-[3px] rounded-t-xl transition-all duration-300 ${
                    edu.current ? "bg-foreground" : "bg-border"
                }`}
            />

            <div className="mt-1 flex items-start justify-between gap-2">
                <SchoolLogo edu={edu} />
                <span
                    className={`flex-shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        edu.current
                            ? "bg-foreground text-background"
                            : "border border-border bg-muted text-muted-foreground"
                    }`}
                >
                    {edu.year}
                </span>
            </div>

            <div className="mt-3 flex flex-col gap-0.5">
                <p className="text-sm font-medium leading-tight text-foreground">
                    {edu.school}
                </p>
                <p className="text-[11px] text-muted-foreground">
                    {t(levelKeys[edu.level] ?? edu.level)}
                </p>
                {edu.major && (
                    <p className="text-[11px] text-foreground">{edu.major}</p>
                )}
            </div>

            <div className="mt-auto flex items-center justify-between pt-3">
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
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
                        </span>
                        {t("now")}
                    </span>
                )}
            </div>
        </>
    );
}

export default function Education() {
    const t = useTranslations("About");
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <section>
            <div className="mb-6 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-foreground" />
                <h2 className="text-lg font-bold text-foreground">{t("education")}</h2>
            </div>
            <p className="text-sm text-muted-foreground -mt-4 mb-6">{t("education_subtitle")}</p>

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
                                className={`!rounded-xl !p-4 relative flex h-full cursor-default flex-col gap-0 overflow-hidden ${
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
                                className={`relative flex h-full cursor-default flex-col overflow-hidden rounded-xl border bg-card p-4 ${
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