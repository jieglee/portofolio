"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { type Platform } from "@/common/constants/creations";

interface PlatformTabsProps {
    active: Platform;
    onChange: (platform: Platform) => void;
}

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);

const tabs: { id: Platform; labelKey: string; icon: React.ReactNode }[] = [
    { id: "tiktok", labelKey: "tab_tiktok", icon: <TikTokIcon /> },
    { id: "instagram", labelKey: "tab_instagram", icon: <InstagramIcon /> },
];

export default function PlatformTabs({ active, onChange }: PlatformTabsProps) {
    const t = useTranslations("Creations");
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
                            layoutId="platform-tab-bg"
                            className="absolute inset-0 rounded-lg bg-background shadow-sm border border-border/50"
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {tab.icon}
                        {t(tab.labelKey)}
                    </span>
                </button>
            ))}
        </div>
    );
}