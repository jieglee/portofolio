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
{
    slug: "mytix-landingpage",
    title: "MyTix — Cinema Ticket Landing Page",
    description:
        "A modern dark-themed cinema ticket booking landing page concept. Built with HTML and Tailwind CSS, featuring a movie showcase, ads carousel, partner logos, and responsive navbar.",
    thumbnail: "/images/projects/mytix-landingpage.png",
    techStack: ["html5", "tailwind", "javascript"],
    sourceUrl: "https://github.com/jieglee/mytix-landingpage",
    demoUrl: "https://mytix-landingpage.vercel.app/",
},
];