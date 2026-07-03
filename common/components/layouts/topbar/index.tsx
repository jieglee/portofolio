"use client"

import Link from "next/link"
import { useState } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { useLayout } from "@/common/stores/layout"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { MdVerified as VerifiedIcon } from "react-icons/md"
import { TbLayoutSidebar as SidebarIcon, TbMenu2 as MenuIcon } from "react-icons/tb"
import { cn } from "@/lib/utils"

import { MAIN_ITEMS, MENU_DROPDOWN_ITEMS } from "@/common/constants/topbar"

export default function Topbar() {
    const { toggleMode } = useLayout()
    const t = useTranslations("Navigation")
    const [menuOpen, setMenuOpen] = useState(false)

    const segment = useSelectedLayoutSegment()
    const pathname = segment ? `/${segment}` : "/"

    return (
        <header className="sticky top-0 z-20 border-b bg-neutral-50/80 backdrop-blur dark:bg-neutral-900/80">
            <div className="mx-auto flex max-w-[90rem] items-center px-6 py-2 gap-3">

                {/* Left: Name */}
                <Link href="/" className="flex items-center gap-1.5">
                    <span className="font-semibold">Runa</span>
                    <VerifiedIcon size={14} className="text-blue-400" />
                </Link>

                <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />

                {/* Center: Main items */}
                <nav className="flex flex-1 items-center gap-1">
                    {MAIN_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-sm transition-colors",
                                    isActive
                                        ? "bg-neutral-200 dark:bg-neutral-800 font-medium"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                )}
                            >
                                {t(item.title)}
                            </Link>
                        )
                    })}
                </nav>

                {/* Right: Menu dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className={cn(
                            "p-2 rounded-lg flex items-center gap-1.5",
                            menuOpen ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )}
                    >
                        <MenuIcon size={18} />
                        <span className="text-sm">Menu</span>
                    </motion.button>

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="absolute right-0 top-full mt-2 w-44 rounded-xl border bg-white dark:bg-neutral-900 p-2 shadow-lg"
                            >
                                {MENU_DROPDOWN_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "block px-3 py-2 rounded-lg text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800",
                                            pathname === item.href && "bg-neutral-200 dark:bg-neutral-800 font-medium"
                                        )}
                                    >
                                        {t(item.title)}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Layout toggle */}
                <button onClick={toggleMode} className="p-2">
                    <SidebarIcon size={18} />
                </button>

            </div>
        </header>
    )
}
