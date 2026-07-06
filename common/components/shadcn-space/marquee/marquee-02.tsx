import { Marquee } from "@/common/components/shadcn-space/animations/marquee";

type SkillItem = {
    icon: string;
    name: string;
};

const skillsRow1: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/javascript", name: "JavaScript" },
    { icon: "https://cdn.simpleicons.org/typescript", name: "TypeScript" },
    { icon: "https://cdn.simpleicons.org/html5", name: "HTML" },
    { icon: "https://cdn.simpleicons.org/css3", name: "CSS" },
    { icon: "https://cdn.simpleicons.org/react", name: "React" },
    { icon: "https://cdn.simpleicons.org/vite", name: "React Vite" },
    { icon: "https://cdn.simpleicons.org/react", name: "React Native" },
    { icon: "https://cdn.simpleicons.org/expo/white", name: "Expo" },
];

const skillsRow2: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/tailwindcss", name: "Tailwind CSS" },
    { icon: "https://cdn.simpleicons.org/nodedotjs", name: "Node.js" },
    { icon: "https://cdn.simpleicons.org/express/white", name: "Express" },
    { icon: "https://cdn.simpleicons.org/mysql", name: "MySQL" },
    { icon: "https://cdn.simpleicons.org/postgresql", name: "PostgreSQL" },
    { icon: "https://cdn.simpleicons.org/supabase", name: "Supabase" },
    { icon: "https://cdn.simpleicons.org/sqlite", name: "SQLite" },
    { icon: "https://cdn.simpleicons.org/github/white", name: "GitHub" },
];

const skillsRow3: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/docker", name: "Docker" },
    { icon: "https://cdn.simpleicons.org/vercel/white", name: "Vercel" },
    { icon: "https://cdn.simpleicons.org/postman", name: "Postman" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M10.5 1.5L3 14h7l-1 8.5L18 11h-6l2-9.5z'/%3E%3C/svg%3E", name: "Thunder Client" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", name: "Visual Studio Code" },
    { icon: "https://cdn.simpleicons.org/figma", name: "Figma" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg", name: "Adobe Illustrator" },
];

const SkillCard = ({ icon, name }: SkillItem) => (
    <div className="group/skill flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 mx-2">
        <img src={icon} alt={name} className="h-5 w-5 shrink-0" />
        <span className="text-sm font-medium text-foreground max-w-0 overflow-hidden whitespace-nowrap transition-all duration-200 group-hover/skill:max-w-[200px]">
            {name}
        </span>
    </div>
);

export default function MarqueeBrandsDemo() {
    return (
        <div className="flex flex-col gap-4">
            {/* Baris 1 — ke kanan */}
            <Marquee className="[--duration:30s] p-0" pauseOnHover>
                {skillsRow1.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>

            {/* Baris 2 — ke kiri */}
            <Marquee className="[--duration:30s] p-0" reverse pauseOnHover>
                {skillsRow2.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>

            {/* Baris 3 — ke kanan */}
            <Marquee className="[--duration:30s] p-0" pauseOnHover>
                {skillsRow3.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>
        </div>
    );
}