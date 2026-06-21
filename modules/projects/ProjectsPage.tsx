"use client";

import { PROJECTS } from "@/common/constants/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          A showcase of personal and open-source projects I have built or contributed to.
        </p>
      </div>

      <div className="h-px w-full border-t border-dashed border-border" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}