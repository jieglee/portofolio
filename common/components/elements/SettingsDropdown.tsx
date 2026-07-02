"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { PiHeartFill } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";

const locales = [
    { value: "en", label: "English (US)", flag: "🇺🇸" },
    { value: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
];

const themes = [
    { value: "light", icon: <MdLightMode size={18} />, label: "Light Mode" },
    { value: "dark", icon: <MdDarkMode size={18} />, label: "Dark Mode" },
    { value: "pink", icon: <PiHeartFill size={16} />, label: "Pink Mode" },
];

const baseStyle = {
    backgroundColor: "#17171A",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
};

const dropdownStyle = {
    ...baseStyle,
    maxHeight: "220px",
    overflowY: "auto" as const,
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
};

const SettingsDropdown = () => {
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

    const currentTheme = themes.find((t) => t.value === resolvedTheme) || themes[1];
    const currentLang = locales.find((l) => l.value === currentLocale) || locales[0];

    const handleThemeChange = (value: string) => {
        setTheme(value);
        setOpenSelect(null);
    };

    const handleLangChange = (value: string) => {
        if (value !== currentLocale) {
            router.replace(pathname, { locale: value, scroll: false });
        }
        setOpenSelect(null);
    };

    return (
        <div ref={ref} className="space-y-2.5 px-1 py-2">
            {/* Theme */}
            <div>
                <p className="mb-1.5 px-1 text-xs font-medium text-white/50">Theme</p>
                <div className="relative">
                    <button
                        onClick={() => setOpenSelect(openSelect === "theme" ? null : "theme")}
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-sm transition-all duration-200 hover:bg-white/[0.04]"
                        style={baseStyle}
                    >
                        <span className="text-white/70">{currentTheme.icon}</span>
                        <span className="flex-1 text-left text-white/90">{currentTheme.label}</span>
                        <motion.span
                            animate={{ rotate: openSelect === "theme" ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-white/40"
                        >
                            <FiChevronDown size={16} />
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {openSelect === "theme" && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute left-0 right-0 z-50 mt-1 overflow-hidden"
                                style={dropdownStyle}
                            >
                                {themes.map((theme) => {
                                    const isSelected = theme.value === resolvedTheme;
                                    return (
                                        <button
                                            key={theme.value}
                                            onClick={() => handleThemeChange(theme.value)}
                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-all duration-150"
                                            style={{
                                                backgroundColor: isSelected
                                                    ? "rgba(180, 160, 255, 0.12)"
                                                    : "transparent",
                                                color: isSelected
                                                    ? "rgb(200, 185, 255)"
                                                    : "rgba(255,255,255,0.6)",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                        >
                                            <span style={{ color: isSelected ? "rgb(200, 185, 255)" : "rgba(255,255,255,0.6)" }}>
                                                {theme.icon}
                                            </span>
                                            <span className="flex-1 text-left">{theme.label}</span>
                                            {isSelected && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-sm"
                                                    style={{ color: "rgb(200, 185, 255)" }}
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

            {/* Language */}
            <div>
                <p className="mb-1.5 px-1 text-xs font-medium text-white/50">Language</p>
                <div className="relative">
                    <button
                        onClick={() => setOpenSelect(openSelect === "language" ? null : "language")}
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-sm transition-all duration-200 hover:bg-white/[0.04]"
                        style={baseStyle}
                    >
                        <span className="text-base">{currentLang.flag}</span>
                        <span className="flex-1 text-left text-white/90">{currentLang.label}</span>
                        <motion.span
                            animate={{ rotate: openSelect === "language" ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-white/40"
                        >
                            <FiChevronDown size={16} />
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {openSelect === "language" && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute left-0 right-0 z-50 mt-1 overflow-hidden"
                                style={dropdownStyle}
                            >
                                {locales.map((locale) => {
                                    const isSelected = locale.value === currentLocale;
                                    return (
                                        <button
                                            key={locale.value}
                                            onClick={() => handleLangChange(locale.value)}
                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-all duration-150"
                                            style={{
                                                backgroundColor: isSelected
                                                    ? "rgba(180, 160, 255, 0.12)"
                                                    : "transparent",
                                                color: isSelected
                                                    ? "rgb(200, 185, 255)"
                                                    : "rgba(255,255,255,0.6)",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                        >
                                            <span className="text-base">{locale.flag}</span>
                                            <span className="flex-1 text-left">{locale.label}</span>
                                            {isSelected && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="ml-auto text-sm"
                                                    style={{ color: "rgb(200, 185, 255)" }}
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
        </div>
    );
};

export default SettingsDropdown;
