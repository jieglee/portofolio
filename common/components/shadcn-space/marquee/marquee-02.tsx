import { Marquee } from "@/common/components/shadcn-space/animations/marquee";

type SkillItem = {
    icon: string;
    name: string;
};

const skillsRow1: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/react", name: "React" },
    { icon: "https://cdn.simpleicons.org/nextdotjs/white", name: "Next.js" },
    { icon: "https://cdn.simpleicons.org/typescript", name: "TypeScript" },
    { icon: "https://cdn.simpleicons.org/tailwindcss", name: "Tailwind CSS" },
    { icon: "https://cdn.simpleicons.org/javascript", name: "JavaScript" },
    { icon: "https://cdn.simpleicons.org/framer", name: "Framer Motion" },
    { icon: "https://cdn.simpleicons.org/git", name: "Git" },
    { icon: "https://cdn.simpleicons.org/github/white", name: "GitHub" },
];

const skillsRow2: SkillItem[] = [
    { icon: "https://cdn.simpleicons.org/nodedotjs", name: "Node.js" },
    { icon: "https://cdn.simpleicons.org/mysql", name: "MySQL" },
    { icon: "https://cdn.simpleicons.org/prisma/white", name: "Prisma" },
    { icon: "https://cdn.simpleicons.org/supabase", name: "Supabase" },
    { icon: "https://cdn.simpleicons.org/expo/white", name: "Expo" },
    { icon: "https://cdn.simpleicons.org/reactnative/white", name: "React Native" },
    { icon: "https://cdn.simpleicons.org/figma", name: "Figma" },
    { icon: "https://cdn.simpleicons.org/vercel/white", name: "Vercel" },
];

const SkillCard = ({ icon, name }: SkillItem) => (
    <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 mx-2">
        <img src={icon} alt={name} className="h-5 w-5" />
        <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
);

export default function MarqueeBrandsDemo() {
    return (
        <div className="flex flex-col gap-4">
            {/* Baris 1 — ke kanan */}
            <Marquee className="[--duration:30s] p-0">
                {skillsRow1.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>

            {/* Baris 2 — ke kiri */}
            <Marquee className="[--duration:30s] p-0" reverse>
                {skillsRow2.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                ))}
            </Marquee>
        </div>
    );
}