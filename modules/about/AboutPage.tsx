"use client";
import { motion } from "framer-motion";
import Introduction from "./Introduction";
import Education from "./Education";

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function AboutPage() {
    return (
        <motion.div
            className="px-6 py-10 lg:px-12"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">About</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    A little bit about me and my educational background.
                </p>
            </motion.div>

            <motion.div variants={item} className="my-6 border-t border-dashed border-border" />

            <motion.div variants={item} className="flex flex-col gap-12">
                <Introduction />
                <Education />
            </motion.div>
        </motion.div>
    );
}