export type Platform = "tiktok" | "instagram";

export interface SocialStats {
    followers: string;
    following: string;
    likes: string;
    totalViews: string;
    totalComments: string;
    totalShares: string;
    totalPosts: string;
    bio: string;
    username: string;
    displayName: string;
    profileUrl: string;
    avatar: string;
}

export interface ContentItem {
    id: string;
    platform: Platform;
    thumbnail: string;
    title: string;
    views: string;
    likes: string;
    url: string;
    date: string;
}

export const SOCIAL_STATS: Record<Platform, SocialStats> = {
    tiktok: {
        username: "satriaabaharii",
        displayName: "Satria Bahari",
        followers: "2.8K",
        following: "81",
        likes: "106.4K",
        totalViews: "1.6M",
        totalComments: "1.4K",
        totalShares: "7.9K",
        totalPosts: "97",
        bio: "💻 Software Engineer 🚀 Building scalable apps ✨ Sharing daily tech tips & tricks",
        profileUrl: "https://www.tiktok.com/@satriaabaharii",
        avatar: "/images/runa gemoy.jpeg",
    },
    instagram: {
        username: "satriabahari_",
        displayName: "Satria Bahari",
        followers: "1.2K",
        following: "342",
        likes: "24.5K",
        totalViews: "320K",
        totalComments: "890",
        totalShares: "2.1K",
        totalPosts: "48",
        bio: "💻 Software Engineer | 🎓 SMK Taruna Bhakti | Building things on the internet",
        profileUrl: "https://www.instagram.com/satriabahari_",
        avatar: "/images/runa gemoy.jpeg",
    },
};

export const CONTENT_ITEMS: ContentItem[] = [
    // TikTok
    {
        id: "tt1",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/1a1a2e/ffffff?text=One+Day",
        title: "One day build: Full Stack App dalam 24 jam",
        views: "245K",
        likes: "18.2K",
        url: "https://www.tiktok.com/@satriaabaharii",
        date: "2024-11-01",
    },
    {
        id: "tt2",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/16213e/ffffff?text=VS+Code",
        title: "Extension terbaik di VS Code yang wajib lo install",
        views: "189K",
        likes: "14.7K",
        url: "https://www.tiktok.com/@satriaabaharii",
        date: "2024-10-15",
    },
    {
        id: "tt3",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/0f3460/ffffff?text=Localhost",
        title: "Share localhost ke siapapun cuma pakai fitur bawaan VS Code",
        views: "312K",
        likes: "22.1K",
        url: "https://www.tiktok.com/@satriaabaharii",
        date: "2024-10-02",
    },
    {
        id: "tt4",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/533483/ffffff?text=Next.js",
        title: "Bikin portofolio Next.js yang bikin HRD terkesan",
        views: "98K",
        likes: "8.9K",
        url: "https://www.tiktok.com/@satriaabaharii",
        date: "2024-09-20",
    },
    {
        id: "tt5",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/2d132c/ffffff?text=React",
        title: "5 React hooks yang jarang diketahui developer junior",
        views: "176K",
        likes: "13.4K",
        url: "https://www.tiktok.com/@satriaabaharii",
        date: "2024-09-05",
    },
    {
        id: "tt6",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/1b1b2f/ffffff?text=Git",
        title: "Git tips yang bikin workflow lo 10x lebih cepat",
        views: "134K",
        likes: "10.2K",
        url: "https://www.tiktok.com/@satriaabaharii",
        date: "2024-08-18",
    },
    // Instagram
    {
        id: "ig1",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/1a1a2e/ffffff?text=UI+Design",
        title: "Minimal UI design tips untuk developer",
        views: "42K",
        likes: "3.2K",
        url: "https://www.instagram.com/satriabahari_",
        date: "2024-11-05",
    },
    {
        id: "ig2",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/16213e/ffffff?text=TypeScript",
        title: "TypeScript cheat sheet yang gw pakai setiap hari",
        views: "38K",
        likes: "2.8K",
        url: "https://www.instagram.com/satriabahari_",
        date: "2024-10-28",
    },
    {
        id: "ig3",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/0f3460/ffffff?text=Tailwind",
        title: "Tailwind CSS tricks yang jarang orang tau",
        views: "55K",
        likes: "4.1K",
        url: "https://www.instagram.com/satriabahari_",
        date: "2024-10-10",
    },
    {
        id: "ig4",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/533483/ffffff?text=Career",
        title: "Roadmap jadi software engineer di usia 17",
        views: "89K",
        likes: "6.7K",
        url: "https://www.instagram.com/satriabahari_",
        date: "2024-09-22",
    },
    {
        id: "ig5",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/2d132c/ffffff?text=Projects",
        title: "Projects yang bikin CV gw dilirik perusahaan",
        views: "61K",
        likes: "4.9K",
        url: "https://www.instagram.com/satriabahari_",
        date: "2024-09-08",
    },
    {
        id: "ig6",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/1b1b2f/ffffff?text=Productivity",
        title: "Setup coding gw yang bikin produktivitas naik 2x",
        views: "35K",
        likes: "2.5K",
        url: "https://www.instagram.com/satriabahari_",
        date: "2024-08-25",
    },
];  