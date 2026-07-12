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
        id: 7,
        title: "Juara 1 Lomba Paduan Suara — Hari Sumpah Pemuda & Bulan Bahasa",
        issuer: "SMK Taruna Bhakti",
        date: "Oktober 2025",
        credential: "",
        type: "Certificate",
        category: "Competition",
        image: "/images/achievments/sertifikat-paduan-suara.jpeg",
        tags: ["Competition", "Choir"],
    },
    {
        id: 8,
        title: "Bachelor of Science Nursing — CNA Simulator",
        issuer: "Roblox University",
        date: "Juli 2025",
        credential: "",
        type: "Certificate",
        category: "Gaming",
        image: "/images/achievments/sertifikat-roblox-nursing.jpeg",
        tags: ["Roblox", "Gaming"],
    },
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
        title: "Online Class Professional Model Makeup & Offline Portfolio Batch 5",
        issuer: "Million Model Agency",
        date: "Januari 2026",
        credential: "",
        type: "Certificate",
        category: "Non-Technical",
        image: "/images/achievments/sertifikat-million-model.jpeg",
        tags: ["Modeling", "Makeup"],
    },
    {
        id: 3,
        title: "Bendahara OSIS Periode 2024/2025",
        issuer: "SMK Taruna Bhakti",
        date: "2024-2025",
        credential: "",
        type: "Certificate",
        category: "Organization",
        image: "/images/achievments/sertifikat-osis.jpeg",
        tags: ["OSIS", "Leadership", "Organization"],
    },
    {
        id: 4,
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
        id: 5,
        title: "Kunjungan Industri PT INTI & ITB",
        issuer: "SMK Taruna Bhakti",
        date: "Januari 2025",
        credential: "",
        type: "Certificate",
        category: "Industry Visit",
        image: "/images/achievments/sertifikat-kunjungan-industri.jpeg",
        tags: ["Industry", "Networking"],
    },
    {
        id: 6,
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