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
    comments?: string;
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
        username: "whoszie._",
        displayName: "Na",
        followers: "—",
        following: "—",
        likes: "—",
        totalViews: "—",
        totalComments: "—",
        totalShares: "—",
        totalPosts: "—",
        bio: "",
        profileUrl: "https://www.instagram.com/whoszie._/",
        avatar: "/images/runa gemoy.jpeg",
    },
};

// Static fallback content items (TikTok akan di-replace live, Instagram tetap static)
export const CONTENT_ITEMS: ContentItem[] = [
    // TikTok fallback
    {
        id: "tt1",
        platform: "tiktok",
        thumbnail: "https://placehold.co/300x400/1a1a2e/ffffff.png?text=TikTok",
        title: "Loading TikTok videos...",
        views: "—",
        likes: "—",
        url: "https://www.tiktok.com/@whoszie._",
        date: "",
    },
    // Instagram fallback
    {
        id: "ig1",
        platform: "instagram",
        thumbnail: "https://placehold.co/400x400/1a1a2e/ffffff.png?text=Instagram",
        title: "Loading Instagram posts...",
        views: "—",
        likes: "—",
        url: "https://www.instagram.com/whoszie._/",
        date: "",
    },
];