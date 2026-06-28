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
        credential: "001/KPG.03.01.03/SMK.TB/KR/VI/2026",
        type: "Certificate",
        category: "Software Engineering",
        image: "/images/sertifikat-uji-level-xi.png",
        tags: ["RPL", "Software Engineering"],
    },
    {
        id: 2,
        title: "Software Engineering Level Test X",
        issuer: "SMK Taruna Bhakti",
        date: "Juni 2025",
        credential: "",
        type: "Certificate",
        category: "Software Engineering",
        image: "/images/sertifikat-uji-level-x.jpeg",
        tags: ["RPL", "Software Engineering"],
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
        image: "/images/sertifikat-dicoding-1.png",
        tags: ["Web", "Programming"],
    },
];