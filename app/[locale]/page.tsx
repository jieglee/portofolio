import { getTranslations, setRequestLocale } from "next-intl/server";
import MarqueeBrandsDemo from "@/common/components/shadcn-space/marquee/marquee-02";
import CreationsSection from "@/modules/home/CreationsSection";
import { type ContentItem, SOCIAL_STATS, type SocialStats } from "@/common/constants/creations";

const TIKTOK_USERNAME = "whoszie._";

async function fetchCreationsServer() {
    try {
        const apiKey = process.env.RAPIDAPI_KEY;
        if (!apiKey) return { videos: null, stats: null };

        const limit = 30;
        const [userRes, statsRes] = await Promise.all([
            fetch(
                `https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts?unique_id=${encodeURIComponent(TIKTOK_USERNAME)}&count=${limit}&cursor=0`,
                {
                    headers: {
                        "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
                        "x-rapidapi-key": apiKey,
                    },
                    next: { revalidate: 3600 },
                }
            ),
            fetch(
                `https://tiktok-video-no-watermark2.p.rapidapi.com/user/info?unique_id=${encodeURIComponent(TIKTOK_USERNAME)}`,
                {
                    headers: {
                        "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
                        "x-rapidapi-key": apiKey,
                    },
                    next: { revalidate: 3600 },
                }
            ),
        ]);

        if (!userRes.ok) return { videos: null, stats: null };

        const userData = await userRes.json();
        const statsData = statsRes.ok ? await statsRes.json() : null;

        const videoList = (userData?.data?.videos ?? []) as Array<{
            video_id?: string;
            id?: string;
            origin_cover?: string;
            cover?: string;
            title?: string;
            desc?: string;
            play_count?: number;
            digg_count?: number;
            comment_count?: number;
            share_count?: number;
            create_time?: number;
            statistics?: { play_count?: number; digg_count?: number };
        }>;

        const formatNumber = (n: number) => {
            if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
            if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
            return String(n);
        };

        const videos: ContentItem[] = videoList.map((v) => {
            const rawCover = v.origin_cover ?? v.cover ?? "";
            const thumbnail = rawCover
                ? `/api/images/proxy?url=${encodeURIComponent(rawCover)}`
                : "";
            return {
                id: v.video_id ?? v.id ?? String(Math.random()),
                platform: "tiktok" as const,
                thumbnail,
                title: v.title ?? v.desc ?? "TikTok video",
                views: formatNumber(v.play_count ?? v.statistics?.play_count ?? 0),
                likes: formatNumber(v.digg_count ?? v.statistics?.digg_count ?? 0),
                comments: formatNumber(v.comment_count ?? 0),
                url: `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${v.video_id ?? v.id}`,
                date: v.create_time
                    ? new Date(v.create_time * 1000).toISOString().split("T")[0]
                    : "",
            };
        });

        const userInfo = statsData?.data?.user ?? null;
        const userStats = statsData?.data?.stats ?? null;

        const totalViews = videoList.reduce((s, v) => s + (v.play_count ?? 0), 0);
        const totalComments = videoList.reduce((s, v) => s + (v.comment_count ?? 0), 0);
        const totalShares = videoList.reduce((s, v) => s + (v.share_count ?? 0), 0);

        const stats: SocialStats | null = userInfo
            ? {
                  ...SOCIAL_STATS.tiktok,
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

        return { videos: videos.length ? videos : null, stats };
    } catch {
        return { videos: null, stats: null };
    }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const { videos, stats } = await fetchCreationsServer();

  return (
    <div className="px-6 py-10 lg:px-12">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
        {t("greeting")}
        <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] origin-[70%_80%]">👋</span>
      </h1>

      {/* Meta info */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-muted-foreground">•</span>
          {t("location")}
        </span>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Bio */}
      <div className="flex flex-col gap-4 text-foreground/80 leading-relaxed [text-align:justify]">
        <p>{t("bio1")}</p>
        <p>{t("bio2")}</p>
        <p>{t("bio3")}</p>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Skills teaser */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          &lt;/&gt; {t("skillsTitle")}  
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("skillsSubtitle")}
        </p>
        <div className="mt-6">
          <MarqueeBrandsDemo />
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 h-px w-full bg-border" />

      {/* Creations Section */}
      <CreationsSection initialVideos={videos} initialStats={stats} />
    </div>
  );
}