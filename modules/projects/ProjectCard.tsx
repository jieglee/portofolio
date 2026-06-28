"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { type ProjectItem } from "@/common/constants/projects";
import { TECH_MAP } from "@/common/constants/tech-icons";

interface ProjectCardProps {
    project: ProjectItem;
    index: number;
}

function TechIcon({ techKey }: { techKey: string }) {
    const [hovered, setHovered] = useState(false);
    const tech = TECH_MAP[techKey as keyof typeof TECH_MAP];
    if (!tech) return null;
    const { Icon } = tech;

    return (
        <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-default transition-transform duration-200 hover:scale-110"
                style={{ background: tech.bg }}
            >
                <Icon size={15} color={tech.color} />
            </div>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.92 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                    >
                        <div className="bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md">
                            {tech.label}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            onClick={() => router.push(`/projects/${project.slug}`)}
            className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {project.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-full">
                        <Pin className="w-3 h-3" />
                        Featured
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-5">
                <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                </p>

                {/* Tech stack icons dengan tooltip */}
                <div className="flex items-center gap-2 flex-wrap mt-1">
                    {project.techStack.map((key) => (
                        <TechIcon key={key} techKey={key} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}