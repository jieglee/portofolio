"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { type ProjectItem } from "@/common/constants/projects";
import { TECH_MAP } from "@/common/constants/tech-icons";

interface ProjectCardProps {
    project: ProjectItem;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const router = useRouter();
    const t = useTranslations("Projects");

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            onClick={() => router.push(`/projects/${project.slug}`)}
            className="group cursor-pointer bg-white dark:bg-[#31313F] border-4 border-black dark:border-white overflow-hidden flex flex-col transition-all duration-300 shadow-[6px_6px_0px_0px_#FF4DA6] dark:shadow-[6px_6px_0px_0px_#22D3EE] hover:shadow-[12px_12px_0px_0px_#60A5FA] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-[6px_6px_0px_0px_#FF4DA6]"
        >
            {/* Thumbnail Box */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted border-b-4 border-black dark:border-white">
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Slanted Comic Badge untuk Featured */}
                {project.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black text-white dark:bg-[#FF4DA6] dark:text-white text-xs font-black px-3 py-1 border-2 border-black dark:border-white transform -skew-x-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Pin className="w-3 h-3 transform skew-x-12" />
                        <span className="transform skew-x-12 tracking-wider font-marker">{t("featured")}</span>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
                <div>
                    <h3 className="font-marker text-xl md:text-2xl text-black dark:text-white tracking-wide uppercase line-clamp-1 group-hover:text-[#FF4DA6] transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-[#31313F]/80 dark:text-[#A6AAB5] font-medium leading-relaxed line-clamp-2 mt-1">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack Icons Wrap */}
                <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t-2 border-dashed border-black/20 dark:border-white/20">
                    {project.techStack.map((key) => {
                        const tech = TECH_MAP[key];
                        if (!tech) return null;
                        const { Icon } = tech;
                        return (
                            <div
                                key={key}
                                title={tech.label}
                                className="w-8 h-8 flex items-center justify-center shrink-0 border-2 border-black dark:border-white transition-transform group-hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                                style={{ background: tech.bg }}
                            >
                                <Icon size={16} color={tech.color} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}