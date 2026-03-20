"use client";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Introduction() {
    return (
        <section>
            {/* Section label */}
            <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Introduction
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <motion.div
                className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10"
                variants={container}
                initial="hidden"
                animate="visible"
            >

                {/* Text */}
                <div className="flex flex-col gap-4">
                    <motion.div variants={item}>
                        <h2 className="text-xl font-bold text-foreground">
                            Anindita Amantaruna Putri Roswanto
                        </h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Student · Depok, Indonesia
                        </p>
                    </motion.div>

                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                        Hi! I&apos;m Jiee — a passionate student at SMK Taruna Bhakti majoring in Software Engineering (RPL).
                        I love building things for the web, from clean UI components to full-stack applications.
                        Currently focused on leveling up my skills in Next.js, TypeScript, and React Native.
                    </motion.p>

                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                        When I&apos;m not coding, I enjoy exploring new tech stacks, working on side projects,
                        and learning from the developer community. I believe in writing clean, maintainable code
                        and creating experiences that feel intuitive and delightful.
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}