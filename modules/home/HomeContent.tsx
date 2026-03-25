"use client";
import { motion } from "framer-motion";
import MarqueeBrandsDemo from "@/common/components/shadcn-space/marquee/marquee-02";

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

interface HomeContentProps {
    greeting: string;
    location: string;
    bio1: string;
    bio2: string;
    skillsTitle: string;
    skillsSubtitle: string;
}

export default function HomeContent({ greeting, location, bio1, bio2, skillsTitle, skillsSubtitle }: HomeContentProps) {
    return (
        <motion.div
            className="px-6 py-10 lg:px-12"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {/* Greeting */}
            <motion.h1 variants={item} className="text-3xl font-bold text-foreground lg:text-4xl">
                {greeting}
            </motion.h1>

            {/* Meta info */}
            <motion.div variants={item} className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                    <span className="text-muted-foreground">•</span>
                    {location}
                </span>
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="my-6 h-px w-full bg-border" />

            {/* Bio */}
            <motion.div variants={item} className="flex max-w-2xl flex-col gap-4 text-foreground/80 leading-relaxed">
                <p>{bio1}</p>
                <p>{bio2}</p>
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="my-6 h-px w-full bg-border" />

            {/* Skills */}
            <motion.div variants={item}>
                <h2 className="text-lg font-semibold text-foreground">
                    &lt;/&gt; {skillsTitle}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{skillsSubtitle}</p>
                <div className="mt-6">
                    <MarqueeBrandsDemo />
                </div>
            </motion.div>
        </motion.div>
    );
}