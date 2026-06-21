"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
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
            <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Technology Stack
                </span>
                <div className="flex items-center gap-2 flex-wrap">
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