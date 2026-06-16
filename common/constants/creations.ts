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

// Static fallback data — akan di-replace live data dari API kalau berhasil
export const SOCIAL_STATS: Record<Platform, SocialStats> = {
    tiktok: {
        username: "whoszie._",
        displayName: "ji",
        followers: "—",
        following: "—",
        likes: "—",
        totalViews: "—",
        totalComments: "—",
        totalShares: "—",
        totalPosts: "—",
        bio: "",
        profileUrl: "https://www.tiktok.com/@whoszie._",
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

// Static fallback content items (TikTok akan di-replace live, Instagram tetap static)
export const CONTENT_ITEMS: ContentItem[] = [
    // TikTok fallback
    {
        id: "tt1",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/1a1a2e/ffffff?text=TikTok",
        title: "Loading TikTok videos...",
        views: "—",
        likes: "—",
        url: "https://www.tiktok.com/@whoszie._",
        date: "",
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