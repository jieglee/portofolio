export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  featured?: boolean;
  techStack: { name: string; icon: string }[];
  sourceUrl?: string;
  demoUrl?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "personal-portfolio-v1",
    title: "Personal Portfolio v1",
    description:
      "My first personal portfolio website built with vanilla HTML, CSS, and JavaScript — featuring a typed.js intro, skills showcase, and a project gallery.",
    thumbnail: "https://placehold.co/800x450/1a0a2e/c084fc?text=Portfolio+v1",
    featured: true,
    techStack: [
      { name: "HTML5", icon: "🧱" },
      { name: "CSS3", icon: "🎨" },
      { name: "JavaScript", icon: "⚙️" },
      { name: "Typed.js", icon: "⌨️" },
      { name: "Font Awesome", icon: "🔤" },
    ],
    sourceUrl: "https://github.com/jieglee/deploy-portofolio",
    demoUrl: "https://jieglee.github.io/deploy-portofolio/",
  },
  {
    slug: "harita-website",
    title: "Harita Website",
    description:
      "Harita is a modern technology-based platform that aims to improve waste management in urban communities.",
    thumbnail: "https://placehold.co/800x450/0a0a0a/4ade80?text=Harita+Website",
    techStack: [
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind", icon: "〰️" },
      { name: "Framer Motion", icon: "⚡" },
      { name: "MongoDB", icon: "🍃" },
    ],
    sourceUrl: "https://github.com/jieglee/harita-website",
    demoUrl: "https://harita.vercel.app",
  },
  {
    slug: "fastapi-library-management",
    title: "FastAPI Library Management Database",
    description:
      "This project is a Library Management System built with FastAPI as the core web framework, with full CRUD and authentication.",
    thumbnail: "https://placehold.co/800x450/1a0a2e/a78bfa?text=FastAPI",
    techStack: [
      { name: "FastAPI", icon: "⚡" },
      { name: "PostgreSQL", icon: "🐘" },
    ],
    sourceUrl: "https://github.com/jieglee/fastapi-library",
    demoUrl: "",
  },
  {
    slug: "ecotera-website",
    title: "Ecotera Website",
    description:
      "Ecotera is an informative website dedicated to supporting MSMEs in the food and beverage sector in understanding and managing halal certification while maintaining environmentally friendly principles.",
    thumbnail: "https://placehold.co/800x450/0a1a0a/4ade80?text=Ecotera",
    techStack: [
      { name: "HTML5", icon: "🧱" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "JavaScript", icon: "⚙️" },
    ],
    sourceUrl: "https://github.com/jieglee/ecotera-website",
    demoUrl: "https://ecotera.vercel.app",
  },
  {
    slug: "sneaker-store",
    title: "SNEAKER",
    description:
      "An e-commerce sneaker store concept with product recommendations, cart, and checkout flow.",
    thumbnail: "https://placehold.co/800x450/0a0a0a/f97316?text=SNEAKER",
    techStack: [
      { name: "React", icon: "⚛️" },
      { name: "Tailwind", icon: "〰️" },
    ],
    sourceUrl: "https://github.com/jieglee/sneaker-store",
    demoUrl: "https://sneaker-store.vercel.app",
  },
];