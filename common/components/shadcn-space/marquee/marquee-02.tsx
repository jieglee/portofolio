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
    { icon: "https://cdn.simpleicons.org/nextdotjs/white", name: "Next.js" },
    { icon: "https://cdn.simpleicons.org/vite", name: "Vite" },
    { icon: "https://cdn.simpleicons.org/react", name: "React Native" },
    { icon: "https://cdn.simpleicons.org/expo/white", name: "Expo" },
    { icon: "https://cdn.simpleicons.org/tailwindcss", name: "Tailwind CSS" },
    { icon: "https://cdn.simpleicons.org/mui", name: "Material UI" },
];

const skillsRow2: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/nodedotjs", name: "Node.js" },
    { icon: "https://cdn.simpleicons.org/express/white", name: "Express.js" },
    { icon: "https://cdn.simpleicons.org/jsonwebtokens", name: "JWT" },
    { icon: "https://cdn.simpleicons.org/zod", name: "Zod" },
    { icon: "https://cdn.simpleicons.org/mysql", name: "MySQL" },
    { icon: "https://cdn.simpleicons.org/postgresql", name: "PostgreSQL" },
    { icon: "https://cdn.simpleicons.org/supabase", name: "Supabase" },
    { icon: "https://cdn.simpleicons.org/docker", name: "Docker" },
    { icon: "https://cdn.simpleicons.org/vercel/white", name: "Vercel" },
    { icon: "https://cdn.simpleicons.org/git", name: "Git" },
    { icon: "https://cdn.simpleicons.org/github/white", name: "GitHub" },
];

const skillsRow3: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/visualstudiocode", name: "VS Code" },
    { icon: "https://cdn.simpleicons.org/postman", name: "Postman" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M10.5 1.5L3 14h7l-1 8.5L18 11h-6l2-9.5z'/%3E%3C/svg%3E", name: "Thunder Client" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Crect x='3' y='3' width='18' height='18' rx='3'/%3E%3Ctext x='12' y='16' text-anchor='middle' font-size='10' fill='%23666'%3EDB%3C/text%3E%3C/svg%3E", name: "DBngin" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E", name: "Laragon" },
    { icon: "https://cdn.simpleicons.org/windows", name: "WSL" },
    { icon: "https://cdn.simpleicons.org/gnubash", name: "Git Bash" },
    { icon: "https://cdn.simpleicons.org/npm", name: "npm" },
    { icon: "https://cdn.simpleicons.org/figma", name: "Figma" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg", name: "Adobe Illustrator" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E", name: "CapCut" },
];

const SkillCard = ({ icon, name }: SkillItem) => (
    <div className="group/skill flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 mx-2">
        <img src={icon} alt={name} className="h-5 w-5 shrink-0" />
        <span className="text-sm font-medium text-foreground">
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