"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { Briefcase } from "lucide-react";

const careerList = [
    {
        logo: "/images/logo-smk.png",
        title: "Treasurer of Student Council (OSIS)",
        organization: "SMK Taruna Bhakti",
        location: "Depok, Indonesia",
        period: "2024 – 2025",
        type: "Student Organization",
        responsibilities: [
            "resp_osis_1",
            "resp_osis_2",
            "resp_osis_3",
            "resp_osis_4",
            "resp_osis_5",
        ],
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 22 },
    },
};

function CareerCardInner({
    item,
    index,
    expandedIndex,
    setExpandedIndex,
}: {
    item: typeof careerList[0];
    index: number;
    expandedIndex: number | null;
    setExpandedIndex: (v: number | null) => void;
}) {
    const t = useTranslations("About");
    return (
        <>
            <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                    {item.logo ? (
                        <Image
                            src={item.logo}
                            alt={item.organization}
                            fill
                            className="object-contain p-1"
                        />
                    ) : (
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                        {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {item.organization}
                        <span className="mx-1.5">•</span>
                        {item.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {item.period}
                        <span className="mx-1.5">•</span>
                        {item.type}
                    </p>

                    <button
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <path d="m9 18 6-6-6-6" />
                        </motion.svg>
                        {expandedIndex === index ? t("hideResponsibilities") : t("showResponsibilities")}
                    </button>

                    <AnimatePresence initial={false}>
                        {expandedIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <ul className="mt-3 space-y-1.5 pl-1">
                                    {item.responsibilities.map((resp, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                                        >
                                            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                                            {t(resp)}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default function Career() {
    const t = useTranslations("About");
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section>
            <div className="mb-6 flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-foreground" />
                <h2 className="text-lg font-bold text-foreground">{t("career")}</h2>
            </div>
            <p className="text-sm text-muted-foreground -mt-4 mb-6">{t("career_subtitle")}</p>

            <motion.div
                className="flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {careerList.map((item, index) => (
                    <motion.div key={index} variants={cardVariant}>
                        {isDark ? (
                            <SpotlightCard
                                className="!p-5 !rounded-xl !bg-card !border-border"
                                spotlightColor="rgba(255, 255, 255, 0.12)"
                            >
                                <CareerCardInner
                                    item={item}
                                    index={index}
                                    expandedIndex={expandedIndex}
                                    setExpandedIndex={setExpandedIndex}
                                />
                            </SpotlightCard>
                        ) : (
                            <div className="rounded-xl border border-border bg-card p-5">
                                <CareerCardInner
                                    item={item}
                                    index={index}
                                    expandedIndex={expandedIndex}
                                    setExpandedIndex={setExpandedIndex}
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}