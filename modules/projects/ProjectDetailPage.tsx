"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ChevronLeft, Copy, Check, Figma } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { type ProjectItem } from "@/common/constants/projects";
import { TECH_MAP } from "@/common/constants/tech-icons";

interface ProjectDetailPageProps {
    project: ProjectItem;
    content: string;
}

// ── Single command copy line (satu baris, tombol copy kanan) ──────
function CopyLine({ command }: { command: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between gap-3 bg-muted/60 border border-border rounded-xl px-4 py-3 my-2 group">
            <code className="text-sm font-mono text-foreground">{command}</code>
            <button
                onClick={handleCopy}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                title="Copy command"
            >
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span
                            key="check"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Check className="w-4 h-4 text-green-500" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Copy className="w-4 h-4" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}

// ── Code block handler — pisah per baris jadi CopyLine ────────────
function CodeBlock({ children }: { children: string }) {
    const lines = children
        .trim()
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

    // Kalau cuma 1 baris, render langsung
    if (lines.length === 1) {
        return <CopyLine command={lines[0]} />;
    }

    // Kalau multi baris, render tiap baris jadi CopyLine sendiri
    return (
        <div className="flex flex-col gap-1 my-2">
            {lines.map((line, i) => (
                <CopyLine key={i} command={line} />
            ))}
        </div>
    );
}

// ── Tech icon dengan tooltip ──────────────────────────────────────
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
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110 cursor-default"
                style={{ background: tech.bg }}
            >
                <Icon size={16} color={tech.color} />
            </div>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.9 }}
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

// ── Main page ─────────────────────────────────────────────────────
export default function ProjectDetailPage({ project, content }: ProjectDetailPageProps) {
    const t = useTranslations("ProjectDetail");
    return (
        <div className="w-full flex flex-col gap-4 py-6 px-4 sm:px-6 max-w-3xl mx-auto">

            {/* Back button */}
            <Link
                href="/projects"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
                <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-muted/40 hover:bg-muted transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </div>
                {t("back")}
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

            {/* Tech Stack + Source Code | Live Demo */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground font-medium">
                        {t("techStack")}
                    </span>
                    {project.techStack.map((key) => (
                        <TechIcon key={key} techKey={key} />
                    ))}
                </div>

                <div className="flex items-center gap-3 text-sm font-medium">
                    {project.sourceUrl && (
                        <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            {t("sourceCode")}
                        </a>
                    )}
                    {(project.sourceUrl && project.figmaUrl) && (
                        <span className="text-border">|</span>
                    )}
                    {project.figmaUrl && (
                        <a
                            href={project.figmaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Figma className="w-4 h-4" />
                            Figma
                        </a>
                    )}
                    {((project.sourceUrl || project.figmaUrl) && project.demoUrl) && (
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
                            {t("liveDemo")}
                        </a>
                    )}
                </div>
            </div>

            {/* Thumbnail */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted"
            >
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>

            {/* Markdown content */}
            <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-justify
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-foreground prose-a:underline prose-a:underline-offset-2
                prose-blockquote:border-l-border prose-blockquote:text-muted-foreground
                prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
                prose-hr:border-border
                prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:m-0
            ">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ className, children }) {
                            const isBlock = className?.startsWith("language-");
                            if (isBlock) {
                                return <CodeBlock>{String(children)}</CodeBlock>;
                            }
                            return (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                                    {children}
                                </code>
                            );
                        },
                        pre({ children }) {
                            return <>{children}</>;
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>
        </div>
    );
}