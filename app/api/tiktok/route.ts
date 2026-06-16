import { NextResponse } from "next/server";

const TIKTOK_USERNAME = "whoszie._";
const RAPIDAPI_HOST = "tiktok-video-no-watermark2.p.rapidapi.com";

export async function GET() {
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Missing RAPIDAPI_KEY" }, { status: 500 });
    }

    try {
        // 1. Fetch user info + video list
        const userRes = await fetch(
            `https://${RAPIDAPI_HOST}/user/posts?unique_id=${encodeURIComponent(TIKTOK_USERNAME)}&count=12&cursor=0`,
            {
                headers: {
                    "x-rapidapi-host": RAPIDAPI_HOST,
                    "x-rapidapi-key": apiKey,
                },
                next: { revalidate: 3600 }, // cache 1 jam
            }
        );

        if (!userRes.ok) {
            throw new Error(`RapidAPI error: ${userRes.status}`);
        }

        const userData = await userRes.json();

        // 2. Fetch user stats
        const statsRes = await fetch(
            `https://${RAPIDAPI_HOST}/user/info?unique_id=${encodeURIComponent(TIKTOK_USERNAME)}`,
            {
                headers: {
                    "x-rapidapi-host": RAPIDAPI_HOST,
                    "x-rapidapi-key": apiKey,
                },
                next: { revalidate: 3600 },
            }
        );

        const statsData = statsRes.ok ? await statsRes.json() : null;

        // 3. Parse video list and compute aggregate stats from raw data
        const videoList = userData?.data?.videos ?? [];

        const rawVideos = videoList.map((v: any) => ({
            play_count: v.play_count ?? 0,
            digg_count: v.digg_count ?? 0,
            comment_count: v.comment_count ?? 0,
            share_count: v.share_count ?? 0,
        }));

        const totalViews = rawVideos.reduce((s: number, v: any) => s + v.play_count, 0);
        const totalComments = rawVideos.reduce((s: number, v: any) => s + v.comment_count, 0);
        const totalShares = rawVideos.reduce((s: number, v: any) => s + v.share_count, 0);

        const videos = videoList.map((v: any) => ({
            id: v.video_id ?? v.id ?? String(Math.random()),
            platform: "tiktok" as const,
            thumbnail: v.origin_cover ?? v.cover ?? "",
            title: v.title ?? v.desc ?? "TikTok video",
            views: formatNumber(v.play_count ?? v.statistics?.play_count ?? 0),
            likes: formatNumber(v.digg_count ?? v.statistics?.digg_count ?? 0),
            comments: formatNumber(v.comment_count ?? 0),
            url: `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${v.video_id ?? v.id}`,
            date: v.create_time
                ? new Date(v.create_time * 1000).toISOString().split("T")[0]
                : "",
        }));

        // 4. Parse user stats — actual path: data.user + data.stats
        const userInfo = statsData?.data?.user ?? null;
        const userStats = statsData?.data?.stats ?? null;
        const stats = userInfo
            ? {
                  username: TIKTOK_USERNAME,
                  displayName: userInfo.nickname ?? TIKTOK_USERNAME,
                  followers: formatNumber(userStats?.followerCount ?? 0),
                  following: formatNumber(userStats?.followingCount ?? 0),
                  likes: formatNumber(userStats?.heartCount ?? 0),
                  totalViews: formatNumber(totalViews),
                  totalComments: formatNumber(totalComments),
                  totalShares: formatNumber(totalShares),
                  totalPosts: formatNumber(userStats?.videoCount ?? videos.length),
                  bio: userInfo.signature ?? "",
                  profileUrl: `https://www.tiktok.com/@${TIKTOK_USERNAME}`,
                  avatar: userInfo.avatarLarger ?? userInfo.avatarMedium ?? "",
              }
            : null;

        return NextResponse.json({ videos, stats });
    } catch (err: any) {
        console.error("[TikTok API]", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

function formatNumber(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
}