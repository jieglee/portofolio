// common/constants/achievements.ts

export type Achievement = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    credential: string;
    link?: string;
    type: string;
    category: string;
    image: string;
    tags: string[];
};

export const achievements: Achievement[] = [
    {
        id: 1,
        title: "Software Engineering Level Test XI",
        issuer: "SMK Taruna Bhakti",
        date: "Juni 2026",
        credential: "",
        type: "Certificate",
        category: "Software Engineering",
        image: "/images/achievments/sertifikat-uji-level-xi.jpeg",
        tags: ["RPL", "FullStack"],
    },
    {
        id: 2,
        title: "Software Engineering Level Test X",
        issuer: "SMK Taruna Bhakti",
        date: "Juni 2025",
        credential: "",
        type: "Certificate",
        category: "Software Engineering",
        image: "/images/achievments/sertifikat-uji-level-x.jpeg",
        tags: ["RPL", "FullStack"],
    },
    {
        id: 3,
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding",
        date: "November 2024",
        credential: "2VX3R7DL3ZYQ",
        link: "https://www.dicoding.com/certificates/2VX3R7DL3ZYQ",
        type: "Certificate",
        category: "Web Development",
        image: "/images/achievments/sertifikat-dicoding-1.png",
        tags: ["Web", "Programming"],
    },
];