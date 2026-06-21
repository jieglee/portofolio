export type TechKey =
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "framer"
  | "mongodb"
  | "fastapi"
  | "postgresql"
  | "html5"
  | "css3"
  | "javascript"
  | "react"
  | "fontawesome"
  | "typedjs";

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  featured?: boolean;
  techStack: TechKey[];
  sourceUrl?: string;
  demoUrl?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "personal-portfolio-v1",
    title: "Personal Portfolio v1",
    description:
      "My first personal portfolio website built with vanilla HTML, CSS, and JavaScript — featuring a typed.js intro, skills showcase, and a project gallery.",
    thumbnail: "/images/projects/personal-portfolio-v1.png", 
    featured: false,
    techStack: ["html5", "css3", "javascript", "typedjs", "fontawesome"],
    sourceUrl: "https://github.com/jieglee/deploy-portofolio",
    demoUrl: "https://jieglee.github.io/deploy-portofolio/",
  },
];