"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
    MdDarkMode as DarkModeIcon,
    MdLightMode as LightModeIcon,
} from "react-icons/md";
import { PiHeartFill as HeartIcon } from "react-icons/pi";

const themes = [
    { value: "light", icon: <LightModeIcon size={17} /> },
    { value: "dark", icon: <DarkModeIcon size={17} /> },
    { value: "pink", icon: <HeartIcon size={15} /> },
];

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="h-10 w-32 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800" />
        );
    }

    const currentIndex = themes.findIndex((t) => t.value === resolvedTheme) ?? 0;
    const slideX = currentIndex * 32;

    const getSliderClass = () => {
        if (resolvedTheme === "pink") return "bg-pink-400";
        if (resolvedTheme === "light") return "bg-neutral-300";
        return "bg-neutral-700";
    };

    const getIconColor = (index: number) => {
        if (currentIndex !== index) return "text-neutral-500";
        if (resolvedTheme === "pink") return "text-white";
        if (resolvedTheme === "light") return "text-neutral-700";
        return "text-white";
    };

    return (
        <div className="flex items-center justify-center">
            {/* Desktop */}
            <div className="relative hidden items-center rounded-full border-[1.5px] border-border bg-muted p-1 lg:flex">
                <motion.div
                    className={`absolute bottom-1 top-1 w-8 rounded-full ${getSliderClass()}`}
                    animate={{ x: slideX }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                {themes.map((theme, index) => (
                    <motion.button
                        key={theme.value}
                        className="relative z-10 flex h-8 w-8 items-center justify-center"
                        onClick={() => setTheme(theme.value)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className={`transition-colors duration-200 ${getIconColor(index)}`}>
                            {theme.icon}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Mobile — cycle through all 3 themes */}
            <button
                className="flex items-center gap-2 rounded-full border-[1.5px] border-border bg-muted p-1 transition duration-200 hover:scale-110 lg:hidden"
                onClick={() => {
                    const next = themes[(currentIndex + 1) % themes.length];
                    setTheme(next.value);
                }}
            >
                <motion.div
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        resolvedTheme === "pink"
                            ? "bg-pink-400 text-white"
                            : resolvedTheme === "light"
                            ? "bg-neutral-300 text-neutral-900"
                            : "bg-neutral-700 text-neutral-50"
                    }`}
                >
                    {themes[(currentIndex + 1) % themes.length].icon}
                </motion.div>
            </button>
        </div>
    );
};

export default ThemeToggle;