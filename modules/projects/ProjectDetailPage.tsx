"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { type ProjectItem } from "@/common/constants/projects";
import { TECH_MAP } from "@/common/constants/tech-icons";

interface ProjectDetailPageProps {
    project: ProjectItem;
    content: string;
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
        >
            {/* Icon bubble */}
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-default transition-transform duration-200 hover:scale-110"
                style={{ background: tech.bg }}
            >
                <Icon size={20} color={tech.color} />
            </div>

            {/* Tooltip */}
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
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProjectDetailPage({ project, content }: ProjectDetailPageProps) {
    return (
        <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6 max-w-3xl mx-auto">
            {/* Back link */}
            <Link
                href="/projects"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </Link>

            {/* Thumbnail */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted"
            >
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </motion.div>

            {/* Title & description */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                    {project.title}
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Technology Stack
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                    {project.techStack.map((key) => (
                        <TechIcon key={key} techKey={key} />
                    ))}
                </div>
            </div>

            {/* Source / Demo buttons */}
            <div className="flex items-center gap-3">
                {project.sourceUrl && (
                    <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-muted/40 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        Source Code
                    </a>
                )}
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                    </a>
                )}
            </div>

            <div className="h-px w-full border-t border-dashed border-border" />

            {/* Markdown content */}
            <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-li:text-muted-foreground
        prose-strong:text-foreground
        prose-a:text-foreground prose-a:underline prose-a:underline-offset-2
        prose-blockquote:border-l-border prose-blockquote:text-muted-foreground
        prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
        prose-hr:border-border prose-code:text-foreground
      ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
        </div>
    );
}