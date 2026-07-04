"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { FiChevronDown } from "react-icons/fi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { PiHeartFill } from "react-icons/pi";
import US from "country-flag-icons/react/3x2/US";
import ID from "country-flag-icons/react/3x2/ID";
import SpotlightButton from "@/common/components/elements/SpotlightButton";
import { cn } from "@/lib/utils";

const locales = [
    { value: "en", labelKey: "lang_en", Flag: US },
    { value: "id", labelKey: "lang_id", Flag: ID },
];

const themes = [
    { value: "light", icon: <MdLightMode size={18} />, labelKey: "theme_light" },
    { value: "dark", icon: <MdDarkMode size={18} />, labelKey: "theme_dark" },
    { value: "pink", icon: <PiHeartFill size={16} />, labelKey: "theme_pink" },
];

function Select<T extends string>({
    options,
    selected,
    isOpen,
    onToggle,
    onSelect,
    renderIcon,
    hideTriggerLabel,
    iconGap,
    t,
}: {
    options: { value: T; labelKey: string }[];
    selected: T;
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (value: T) => void;
    renderIcon: (value: T) => React.ReactNode;
    hideTriggerLabel?: boolean;
    iconGap?: string;
    t: (key: string) => string;
}) {
    return (
        <div>
            <div className="relative">
                <SpotlightButton
                    onClick={onToggle}
                    className={cn(
                        "flex w-full items-center border px-4 py-3 text-sm transition-all duration-200 rounded-xl bg-background text-foreground border-border hover:bg-accent/50",
                        iconGap ?? "gap-2.5"
                    )}
                >
                    <span className="flex items-center">{renderIcon(selected)}</span>
                    {!hideTriggerLabel && (
                        <span className="flex-1 text-left">{t(options.find((o) => o.value === selected)?.labelKey ?? "")}</span>
                    )}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground"
                    >
                        <FiChevronDown size={16} />
                    </motion.span>
                </SpotlightButton>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.12, ease: "easeOut" }}
                            className="absolute bottom-full left-0 right-0 z-50 overflow-hidden rounded-xl border bg-background border-border shadow-lg mb-1.5"
                        >
                            {options.map((option) => {
                                const active = option.value === selected;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => onSelect(option.value)}
                                        className={cn(
                                            "flex w-full items-center px-4 py-2.5 text-sm transition-all duration-150",
                                            iconGap ?? "gap-2.5",
                                            active
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:bg-accent/50"
                                        )}
                                    >
                                        <span className="flex items-center">{renderIcon(option.value)}</span>
                                        <span className="flex-1 text-left">{t(option.labelKey)}</span>
                                        {active && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-sm text-accent-foreground"
                                            >
                                                ✓
                                            </motion.span>
                                        )}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const SettingsDropdown = () => {
    const t = useTranslations("Settings");
    const [openSelect, setOpenSelect] = useState<"theme" | "language" | null>(null);
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpenSelect(null);
            }
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, []);

    const themeValue = (mounted ? resolvedTheme : "dark") as "light" | "dark" | "pink";
    const langValue = currentLocale as "en" | "id";

    return (
        <div ref={ref} className="space-y-2.5 px-1 py-2">
            <Select
                options={themes}
                selected={themeValue}
                isOpen={openSelect === "theme"}
                onToggle={() => setOpenSelect(openSelect === "theme" ? null : "theme")}
                onSelect={(v) => {
                    setTheme(v);
                    setOpenSelect(null);
                }}
                renderIcon={(v) => {
                    const th = themes.find((x) => x.value === v);
                    return th ? th.icon : "🌙";
                }}
                t={t}
            />

            <Select
                options={locales}
                selected={langValue}
                isOpen={openSelect === "language"}
                onToggle={() => setOpenSelect(openSelect === "language" ? null : "language")}
                onSelect={(v) => {
                    if (v !== currentLocale) {
                        router.replace(pathname, { locale: v, scroll: false });
                    }
                    setOpenSelect(null);
                }}
                renderIcon={(v) => {
                    const l = locales.find((x) => x.value === v);
                    return l ? <l.Flag style={{ width: 22, height: 16 }} /> : <US style={{ width: 22, height: 16 }} />;
                }}
                iconGap="gap-3"
                t={t}
            />
        </div>
    );
};

export default SettingsDropdown;
