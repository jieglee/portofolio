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
    { icon: "https://cdn.simpleicons.org/visualstudiocode", name: "Visual Studio Code" },
    { icon: "https://cdn.simpleicons.org/postman", name: "Postman" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M10.5 1.5L3 14h7l-1 8.5L18 11h-6l2-9.5z'/%3E%3C/svg%3E", name: "Thunder Client" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cellipse cx='12' cy='6' rx='9' ry='3' fill='%2333A0FF'/%3E%3Cpath d='M3 6v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6' fill='%2333A0FF'/%3E%3Cpath d='M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3' fill='%232280D0'/%3E%3Ctext x='12' y='14' text-anchor='middle' font-size='8' font-weight='bold' fill='white'%3EDB%3C/text%3E%3C/svg%3E", name: "DBngin" },
    { icon: "https://cdn.simpleicons.org/laragon", name: "Laragon" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='4' fill='%230078D4'/%3E%3Ctext x='12' y='17' text-anchor='middle' font-size='11' font-weight='bold' fill='white'%3EWSL%3C/text%3E%3C/svg%3E", name: "WSL" },
    { icon: "https://cdn.simpleicons.org/gnubash", name: "Git Bash" },
    { icon: "https://cdn.simpleicons.org/npm", name: "npm" },
    { icon: "https://cdn.simpleicons.org/figma", name: "Figma" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg", name: "Adobe Illustrator" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23FF6B00'/%3E%3Cpath d='M9 6v12l9-6z' fill='white'/%3E%3C/svg%3E", name: "CapCut" },
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