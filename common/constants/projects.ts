export type TechKey =
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "framer"
  | "mongodb"
  | "mysql"
  | "fastapi"
  | "postgresql"
  | "html5"
  | "css3"
  | "javascript"
  | "react"
  | "fontawesome"
  | "typedjs"
  | "illustrator"
  | "vite"
  | "supabase"
  | "expo"
  | "express";

  

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  featured?: boolean;
  techStack: TechKey[];
  sourceUrl?: string;
  demoUrl?: string;
  figmaUrl?: string;
}

export const PROJECTS: ProjectItem[]  = [
{
    slug: "lapor-gas",
    title: "LaporGas — Civic Complaint Platform",
    description:
        "A full-stack civic complaint platform with 3 platforms: web dashboard (Next.js), mobile app (Expo), and REST API (Express + PostgreSQL). Features AI auto-categorization via Ollama, GPS location, multi-photo upload, and real-time notifications.",
    thumbnail: "/images/projects/laporgas-pengaduan.jpeg",
    featured: true,
    techStack: ["nextjs", "typescript", "tailwind", "framer", "postgresql", "expo", "express"],
    sourceUrl: "https://github.com/jieglee/laporGas-next",
    demoUrl: "",
},
  {
    slug: "pemilihan-osis-web",
    title: "Pemilihan Ketua OSIS — Web App",
    description:
        "A digital OSIS chairman election web app for SMK Taruna Bhakti. Group project for Program Analysis subject, featuring secure voting, candidate profiles, and live result charts.",
    thumbnail: "/images/projects/pemilihan-ketua-osis.jpeg",
    techStack: ["nextjs", "typescript", "tailwind", "framer"],
    sourceUrl: "https://github.com/Aghissulaiman/pemilihan-osis-web",
    demoUrl: "",
},
  {
    slug: "pustbaka",
    title: "PusTBaka — Digital School Library System",
    description:
        "A digital school library system with two platforms: a mobile app (Expo/React Native) for students to browse and borrow books, and a web app (Next.js) for admin to manage collections and track transactions.",
    thumbnail: "/images/projects/perpustakan.jpeg",
    featured: true,
    techStack: ["nextjs", "javascript", "tailwind", "framer", "mysql", "expo", "react"],
    sourceUrl: "https://github.com/jieglee/pustbaka-next",
    demoUrl: "",
},
  {
    slug: "jiepaws-petshop",
    title: "JiePaws — Pet Shop E-Commerce",
    description:
        "A fully functional pet shop e-commerce app with cart, wishlist, checkout, and order history. Built with React + Vite and Tailwind CSS as a Grade 10 school project.",
    thumbnail: "/images/projects/jiepaws-petshop.png",
    techStack: ["react", "vite", "tailwind", "framer"],
    sourceUrl: "https://github.com/jieglee/jiepaws-react-vite",
    demoUrl: "https://jiepaws.vercel.app/",
    figmaUrl: "https://www.figma.com/design/jiCEcFsTSQ8M5sgSujRtQw/E-COMMERCE-PROJECT-2?t=L1qXjiVhbUCLMNqb-1",
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
    figmaUrl: "https://www.figma.com/design/zVH2IUdrA3oAhtZT4ywgXy/TICKETING?node-id=1070-741&t=zvHeDOiBJ0poBoCU-1",
},
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
    figmaUrl: "https://www.figma.com/design/hHctyXWpnwMb6rMauMO0CI/DESAIN-PORTOFOLIO-UNGU?node-id=0-1&t=L1qXjiVhbUCLMNqb-1",
},
  {
    slug: "hatsune-miku-cinnamoroll",
    title: "Hatsune Miku × Cinnamoroll",
    description:
        "A digital illustration of Hatsune Miku reimagined in Cinnamoroll's cute chibi style, created using Adobe Illustrator.",
    thumbnail: "/images/projects/Hatsune-Miku-Cinamoroll.jpg",
    techStack: ["illustrator"],
    sourceUrl: "",
    demoUrl: "",
},
  {
    slug: "dicoding-biodata-songkang",
    title: "Song Kang — Biodata Website",
    description:
        "A simple biographical website about Korean actor Song Kang, built with pure HTML and CSS as part of the Dicoding 'Belajar Dasar Pemrograman Web' course.",
    thumbnail: "/images/projects/dicoding-biodata-songkang.png",
    techStack: ["html5", "css3"],
    sourceUrl: "https://github.com/jieglee/dicoding-biodata-songkang",
    demoUrl: "https://dicoding-biodata-songkang.vercel.app/",
},
];
