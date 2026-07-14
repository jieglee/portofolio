import { NextResponse } from "next/server";

const INSTAGRAM_USERNAME = "whoszie._";
const INSTAGAPI_KEY = process.env.INSTAGAPI_KEY ?? "";

export async function GET() {
    if (!INSTAGAPI_KEY) {
        return NextResponse.json({ error: "Missing INSTAGAPI_KEY" }, { status: 500 });
    }

    try {
        const [infoRes, postsRes] = await Promise.all([
            fetch(
                `https://api.instagapi.com/api/user/info?username_or_id=${encodeURIComponent(INSTAGRAM_USERNAME)}`,
                {
                    headers: { "X-Api-Key": INSTAGAPI_KEY },
                    next: { revalidate: 3600 },
                }
            ),
            fetch(
                `https://api.instagapi.com/api/user/posts?username_or_id=${encodeURIComponent(INSTAGRAM_USERNAME)}&count=12`,
                {
                    headers: { "X-Api-Key": INSTAGAPI_KEY },
                    next: { revalidate: 3600 },
                }
            ),
        ]);

        if (!infoRes.ok) throw new Error(`Instagapi info error: ${infoRes.status}`);
        if (!postsRes.ok) throw new Error(`Instagapi posts error: ${postsRes.status}`);

        const infoData = await infoRes.json();
        const postsData = await postsRes.json();

        const user = infoData.data;
        const postsList = postsData.data ?? [];

        const totalLikes = postsList.reduce((s: number, p: { like_count?: number }) => s + (p.like_count ?? 0), 0);
        const totalComments = postsList.reduce((s: number, p: { comment_count?: number }) => s + (p.comment_count ?? 0), 0);

        const stats = {
            username: INSTAGRAM_USERNAME,
            displayName: user.full_name ?? INSTAGRAM_USERNAME,
            followers: formatNumber(user.follower_count ?? 0),
            following: formatNumber(user.following_count ?? 0),
            likes: formatNumber(totalLikes),
            totalViews: formatNumber(totalLikes),
            totalComments: formatNumber(totalComments),
            totalShares: "—",
            totalPosts: formatNumber(user.media_count ?? postsList.length),
            bio: user.biography ?? "",
            profileUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
            avatar: user.profile_pic_url_hd ?? user.profile_pic_url ?? "",
        };

        const posts = postsList.map((p: {
            id?: string;
            shortcode?: string;
            display_url?: string;
            caption?: string;
            like_count?: number;
            comment_count?: number;
            taken_at?: number;
        }) => ({
            id: p.id ?? p.shortcode ?? "",
            platform: "instagram" as const,
            thumbnail: p.display_url ?? "",
            title: p.caption ?? "",
            views: formatNumber(p.like_count ?? 0),
            likes: formatNumber(p.like_count ?? 0),
            comments: formatNumber(p.comment_count ?? 0),
            url: `https://www.instagram.com/p/${p.shortcode ?? ""}/`,
            date: p.taken_at ? new Date(p.taken_at * 1000).toISOString().split("T")[0] : "",
        }));

        return NextResponse.json({ posts, stats });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error("[Instagram API]", msg);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

function formatNumber(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
}
