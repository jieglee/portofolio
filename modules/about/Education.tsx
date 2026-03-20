"use client";
import { motion } from "framer-motion";

const educationList = [
    {
        id: 1,
        school: "SMK Taruna Bhakti",
        level: "Senior High School",
        major: "Rekayasa Perangkat Lunak (RPL)",
        year: "2024 — 2027",
        location: "Depok, Indonesia",
        logo: "/images/logo-smk.png",
        current: true,
    },
    {
        id: 2,
        school: "SMP ...",
        level: "Junior High School",
        major: null,
        year: "2020 — 2024",
        location: "Depok, Indonesia",
        logo: "/images/logo-smp.png",
        current: false,
    },
    {
        id: 3,
        school: "SD AL IRSYAD AL ISLAMIYYAH DEPOK",
        level: "Elementary School",
        major: null,
        year: "2014 — 2020",
        location: "Depok, Indonesia",
        logo: "/images/logo-sd.png",
        current: false,
    },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariant = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Education() {
    return (
        <section>
            {/* Section label */}
            <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Education
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <motion.div
                className="relative flex flex-col"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Vertical line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border md:left-[23px]" />

                {educationList.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        variants={itemVariant}
                        className="relative flex gap-4 pb-8 last:pb-0 md:gap-6"
                    >
                        {/* Logo circle */}
                        <div className="relative z-10 flex-shrink-0">
                            <div
                                className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 bg-card md:h-12 md:w-12 ${edu.current ? "border-foreground" : "border-border"
                                    }`}
                            >
                                <img
                                    src={edu.logo}
                                    alt={edu.school}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        // fallback ke inisial kalau logo ga ada
                                        const target = e.currentTarget;
                                        target.style.display = "none";
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector("span")) {
                                            const span = document.createElement("span");
                                            span.className = "text-xs font-bold text-foreground";
                                            span.textContent = edu.school.charAt(0);
                                            parent.appendChild(span);
                                        }
                                    }}
                                />
                            </div>
                            {/* Current dot */}
                            {edu.current && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-foreground" />
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-1 pt-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <h3 className="font-semibold text-foreground leading-tight">
                                        {edu.school}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">{edu.level}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span
                                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${edu.current
                                                ? "bg-foreground text-background"
                                                : "border border-border bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {edu.year}
                                    </span>
                                </div>
                            </div>

                            {edu.major && (
                                <p className="text-xs text-muted-foreground">
                                    Major: <span className="font-medium text-foreground">{edu.major}</span>
                                </p>
                            )}

                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {edu.location}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}