"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
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
      className="cursor-pointer"
      suppressHydrationWarning
    >
      <SpotlightCard
        className="!p-0 !rounded-2xl !bg-card !border-border group flex flex-col overflow-hidden transition-shadow hover:shadow-lg dark:!bg-neutral-900 dark:!border-neutral-800"
        spotlightColor="rgba(255, 255, 255, 0.12)"
      >
        <CardContent project={project} />
      </SpotlightCard>
    </motion.div>
  );
}

    function CardContent({ project }: { project: ProjectItem }) {
    const t = useTranslations("Projects");
    return (
        <>
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            />
            {project.featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-full">
                <Pin className="w-3 h-3" />
                {t("featured")}
            </div>
            )}
        </div>

        <div className="flex flex-col gap-3 p-5">
            <h3 className="font-semibold text-foreground text-lg leading-tight">
            {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap mt-1">
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
        </>
    );
    }