"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { type ProjectItem } from "@/common/constants/projects";
import { TECH_MAP } from "@/common/constants/tech-icons";

interface ProjectDetailPageProps {
    project: ProjectItem;
    content: string;
}

export default function ProjectDetailPage({ project, content }: ProjectDetailPageProps) {
    return (
        <div className="w-full flex flex-col gap-4 py-6 px-4 sm:px-6 max-w-3xl mx-auto">

            {/* Back button — buletan */}
            <Link
                href="/projects"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
                <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-muted/40 hover:bg-muted transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </div>
                Back
            </Link>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {project.title}
            </h1>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
            </p>

            {/* Separator */}
            <div className="border-t border-dashed border-border" />

            {/* Tech Stack + Source Code | Live Demo — satu baris */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Tech stack */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground font-medium">
                        Technology Stack :
                    </span>
                    {project.techStack.map((key) => {
                        const tech = TECH_MAP[key];
                        const { Icon } = tech;
                        return (
                            <div
                                key={key}
                                title={tech.label}
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: tech.bg }}
                            >
                                <Icon size={16} color={tech.color} />
                            </div>
                        );
                    })}
                </div>

                {/* Source Code | Live Demo */}
                <div className="flex items-center gap-3 text-sm font-medium">
                    {project.sourceUrl && (
                        <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Source Code
                        </a>
                    )}
                    {project.sourceUrl && project.demoUrl && (
                        <span className="text-border">|</span>
                    )}
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>

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
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>

            {/* Markdown content */}
            <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-li:text-muted-foreground
        prose-strong:text-foreground
        prose-a:text-foreground prose-a:underline prose-a:underline-offset-2
        prose-blockquote:border-l-border prose-blockquote:text-muted-foreground
        prose-table:text-sm
        prose-th:text-foreground
        prose-td:text-muted-foreground
        prose-hr:border-border
      ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>

        </div>
    );
}