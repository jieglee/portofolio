import { Marquee } from "@/common/components/shadcn-space/animations/marquee";

type SkillItem = {
    icon: string;
    name: string;
};

const skillsRow1: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/javascript", name: "JavaScript" },
    { icon: "https://cdn.simpleicons.org/typescript", name: "TypeScript" },
    { icon: "https://cdn.simpleicons.org/html5", name: "HTML" },
    { icon: "https://cdn.simpleicons.org/css", name: "CSS" },
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
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", name: "Visual Studio Code" },
    { icon: "https://cdn.simpleicons.org/postman", name: "Postman" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M10.5 1.5L3 14h7l-1 8.5L18 11h-6l2-9.5z'/%3E%3C/svg%3E", name: "Thunder Client" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cellipse cx='12' cy='6' rx='9' ry='3' fill='%2333A0FF'/%3E%3Cpath d='M3 6v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6' fill='%2333A0FF'/%3E%3Cpath d='M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3' fill='%232280D0'/%3E%3Ctext x='12' y='14' text-anchor='middle' font-size='8' font-weight='bold' fill='white'%3EDB%3C/text%3E%3C/svg%3E", name: "DBngin" },
    { icon: "https://cdn.simpleicons.org/laragon", name: "Laragon" },
    { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1C8 1 5 4 5 7c0 2 .8 3.5 2 4.5V14c0 3 2.5 5 5 5s5-2 5-5v-2.5c1.2-1 2-2.5 2-4.5 0-3-3-6-7-6zm0 2c2.5 0 4.5 2 4.5 4.5S14.5 12 12 12s-4.5-2-4.5-4.5S9.5 3 12 3zm-2 13h4c0 2-1 3-2 3s-2-1-2-3z' fill='%230078D4'/%3E%3Cpath d='M10 6.5c0-.8.5-1.5 1-1.5s1 .7 1 1.5S12 8 11.5 8 10 7.3 10 6.5zm2.5 0c0-.3.2-.5.5-.5s.5.2.5.5-.2.5-.5.5-.5-.2-.5-.5z' fill='white'/%3E%3C/svg%3E", name: "WSL" },
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
            <Marquee className="[--duration:45s] p-0" pauseOnHover>
                {skillsRow1.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>

            {/* Baris 2 — ke kiri */}
            <Marquee className="[--duration:45s] p-0" reverse pauseOnHover>
                {skillsRow2.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>

            {/* Baris 3 — ke kanan */}
            <Marquee className="[--duration:45s] p-0" pauseOnHover>
                {skillsRow3.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>
        </div>
    );
}