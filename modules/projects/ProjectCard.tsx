"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { type ProjectItem } from "@/common/constants/projects";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
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

        {/* Tech stack icons */}
        <div className="flex items-center gap-2 flex-wrap mt-1">
          {project.techStack.map((tech) => (
            <div
              key={tech.name}
              title={tech.name}
              className="w-7 h-7 rounded-md bg-muted/60 border border-border flex items-center justify-center text-xs"
            >
              {tech.icon}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}