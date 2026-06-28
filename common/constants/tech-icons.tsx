import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiMongodb,
  SiFastapi,
  SiPostgresql,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
} from "react-icons/si";
import { FaFontAwesome } from "react-icons/fa6";
import { type IconType } from "react-icons";
import { type TechKey } from "@/common/constants/projects";
import { DiIllustrator } from "react-icons/di";
import { SiVite } from "react-icons/si";

interface TechMeta {
  label: string;
  Icon: IconType;
  color: string; // brand color
  bg: string; // background chip color
}

export const TECH_MAP: Record<TechKey, TechMeta> = {
  nextjs: {
    label: "Next.js",
    Icon: SiNextdotjs,
    color: "#ffffff",
    bg: "#000000",
  },
  typescript: {
    label: "TypeScript",
    Icon: SiTypescript,
    color: "#ffffff",
    bg: "#3178C6",
  },
  tailwind: {
    label: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#ffffff",
    bg: "#06B6D4",
  },
  framer: {
    label: "Framer Motion",
    Icon: SiFramer,
    color: "#ffffff",
    bg: "#0055FF",
  },
  mongodb: {
    label: "MongoDB",
    Icon: SiMongodb,
    color: "#ffffff",
    bg: "#47A248",
  },
  fastapi: {
    label: "FastAPI",
    Icon: SiFastapi,
    color: "#ffffff",
    bg: "#009688",
  },
  postgresql: {
    label: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#ffffff",
    bg: "#4169E1",
  },
  html5: {
    label: "HTML5",
    Icon: SiHtml5,
    color: "#ffffff",
    bg: "#E34F26",
  },
  css3: {
    label: "CSS3",
    Icon: SiCss,
    color: "#ffffff",
    bg: "#1572B6",
  },
  javascript: {
    label: "JavaScript",
    Icon: SiJavascript,
    color: "#000000",
    bg: "#F7DF1E",
  },
  react: {
    label: "React",
    Icon: SiReact,
    color: "#ffffff",
    bg: "#149ECA",
  },
  fontawesome: {
    label: "Font Awesome",
    Icon: FaFontAwesome,
    color: "#ffffff",
    bg: "#528DD7",
  },
  typedjs: {
    label: "Typed.js",
    Icon: SiJavascript,
    color: "#000000",
    bg: "#F7DF1E",
  },
  illustrator: {
    label: "Adobe Illustrator",
    Icon: DiIllustrator,
    color: "#ffffff",
    bg: "#FF9A00",
},
vite: {
    label: "Vite",
    Icon: SiVite,
    color: "#ffffff",
    bg: "#646CFF",
},
};