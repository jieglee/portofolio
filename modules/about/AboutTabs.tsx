"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export type AboutTab = "introduction" | "resume" | "career" | "education";

interface AboutTabsProps {
    active: AboutTab;
    onChange: (tab: AboutTab) => void;
}

const tabs: { id: AboutTab; labelKey: string }[] = [
    { id: "introduction", labelKey: "introduction" },
    { id: "resume", labelKey: "resume" },
    { id: "career", labelKey: "career" },
    { id: "education", labelKey: "education" },
];

export default function AboutTabs({ active, onChange }: AboutTabsProps) {
    const t = useTranslations("About");
    return (
        <div className="relative flex rounded-xl border border-border bg-muted/30 p-1 gap-1">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className="relative flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 z-10"
                    style={{
                        color: active === tab.id ? "var(--foreground)" : "var(--muted-foreground)",
                    }}
                >
                    {active === tab.id && (
                        <motion.div
                            layoutId="about-tab-bg"
                            className="absolute inset-0 rounded-lg bg-background shadow-sm border border-border/50"
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                    )}
                    <span className="relative z-10">{t(tab.labelKey)}</span>
                </button>
            ))}
        </div>
    );
}