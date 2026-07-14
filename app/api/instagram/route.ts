import { NextResponse } from "next/server";

const INSTAGRAM_USERNAME = "whoszie._";

export async function GET() {
    try {
        const oembedUrl = `https://api.instagram.com/oembed?url=https://www.instagram.com/${INSTAGRAM_USERNAME}/&format=json`;

        const res = await fetch(oembedUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`oembed error: ${res.status}`);
        }

        const data = await res.json();

        // oembed provides: author_name, author_url, author_id, thumbnail_url, title, type, provider_url, url, height, width
        const fullName = data.author_name ?? INSTAGRAM_USERNAME;
        const avatarUrl = data.thumbnail_url ?? "";
        const authorUrl = data.author_url ?? `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

        // Fallback: oembed doesn't give followers/following/posts counts.
        // We use static social-stats that will show as "—" if we cannot derive them.
        // The profile pic and name come from oembed.

        const stats = {
            username: INSTAGRAM_USERNAME,
            displayName: fullName,
            followers: "—",
            following: "—",
            likes: "—",
            totalViews: "—",
            totalComments: "—",
            totalShares: "—",
            totalPosts: "—",
            bio: "",
            profileUrl: authorUrl,
            avatar: avatarUrl,
        };

        // Try to extract recent post thumbnails via the oembed thumbnail (profile pic).
        // For actual recent posts, we fall back to author_url embed thumbnails.
        // Since oembed only returns profile info, we return an empty posts array
        // so the front end will use CONTENT_ITEMS fallback.
        const posts: {
            id: string;
            platform: "instagram";
            thumbnail: string;
            title: string;
            views: string;
            likes: string;
            comments: string;
            url: string;
            date: string;
        }[] = [];

        return NextResponse.json({ posts, stats });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error("[Instagram API]", msg);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
