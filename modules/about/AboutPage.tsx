"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import Introduction from "./Introduction";
import Education from "./Education";
import Resume from "./Resume";
import Career from "./Career";
import AboutTabs, { type AboutTab } from "./AboutTabs";

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function AboutPage() {
    const t = useTranslations("About");
    const [activeTab, setActiveTab] = useState<AboutTab>("introduction");

    return (
        <motion.div
            className="px-6 py-10 lg:px-12"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{t("title")}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {t("subtitle")}
                </p>
            </motion.div>

            <motion.div variants={item} className="my-6 border-t border-dashed border-border" />

            <motion.div variants={item} className="mb-8">
                <AboutTabs active={activeTab} onChange={setActiveTab} />
            </motion.div>

            <motion.div variants={item} key={activeTab}>
                {activeTab === "introduction" && <Introduction />}
                {activeTab === "resume" && <Resume />}
                {activeTab === "career" && <Career />}
                {activeTab === "education" && <Education />}
            </motion.div>
        </motion.div>
    );
}
