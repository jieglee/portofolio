import { NextResponse } from "next/server";

interface InstagramEdge {
    node: {
        id: string;
        display_url?: string;
        shortcode?: string;
        taken_at_timestamp?: number;
        edge_media_preview_like?: { count?: number };
        edge_media_to_comment?: { count?: number };
        edge_media_to_caption?: {
            edges?: { node?: { text?: string } }[];
        };
    };
}

const INSTAGRAM_USERNAME = "whoszie._";
const RAPIDAPI_HOST =
    process.env.INSTAGRAM_RAPIDAPI_HOST ?? "instagram-cheapest.p.rapidapi.com";

export async function GET() {
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Missing RAPIDAPI_KEY" }, { status: 500 });
    }

    try {
        const res = await fetch(
            `https://${RAPIDAPI_HOST}/api/v1/instagram/user/${encodeURIComponent(INSTAGRAM_USERNAME)}`,
            {
                headers: {
                    "x-rapidapi-host": RAPIDAPI_HOST,
                    "x-rapidapi-key": apiKey,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) {
            throw new Error(`RapidAPI error: ${res.status}`);
        }

        const body = await res.json();

        if (body.status !== "ok" || !body.data?.user) {
            throw new Error("Invalid API response");
        }

        const user = body.data.user as {
            full_name?: string;
            biography?: string;
            profile_pic_url_hd?: string;
            profile_pic_url?: string;
            edge_followed_by?: { count?: number };
            edge_follow?: { count?: number };
            edge_owner_to_timeline_media?: {
                count?: number;
                edges?: InstagramEdge[];
            };
        };

        // Extract posts from edge_owner_to_timeline_media
        const rawEdges: InstagramEdge[] = user.edge_owner_to_timeline_media?.edges ?? [];

        const totalLikes = rawEdges.reduce(
            (s: number, e) => s + (e.node.edge_media_preview_like?.count ?? 0),
            0
        );
        const totalComments = rawEdges.reduce(
            (s: number, e) => s + (e.node.edge_media_to_comment?.count ?? 0),
            0
        );

        const posts = rawEdges.map((e) => {
            const n = e.node;
            const caption =
                n.edge_media_to_caption?.edges?.[0]?.node?.text ?? "";
            return {
                id: n.id,
                platform: "instagram" as const,
                thumbnail: n.display_url ?? "",
                title: caption,
            views: formatNumber(n.edge_media_preview_like?.count ?? 0),
            likes: formatNumber(n.edge_media_preview_like?.count ?? 0),
            comments: formatNumber(n.edge_media_to_comment?.count ?? 0),
                url: `https://www.instagram.com/p/${n.shortcode}/`,
                date: n.taken_at_timestamp
                    ? new Date(n.taken_at_timestamp * 1000).toISOString().split("T")[0]
                    : "",
            };
        });

        const stats = {
            username: INSTAGRAM_USERNAME,
            displayName: user.full_name ?? INSTAGRAM_USERNAME,
            followers: formatNumber(user.edge_followed_by?.count ?? 0),
            following: formatNumber(user.edge_follow?.count ?? 0),
            likes: formatNumber(totalLikes),
            totalViews: formatNumber(totalLikes),
            totalComments: formatNumber(totalComments),
            totalShares: "—",
            totalPosts: formatNumber(user.edge_owner_to_timeline_media?.count ?? posts.length),
            bio: user.biography ?? "",
            profileUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
            avatar: user.profile_pic_url_hd ?? user.profile_pic_url ?? "",
        };

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
