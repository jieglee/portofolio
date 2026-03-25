"use client";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

export const pageItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 22 },
    },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    );
}