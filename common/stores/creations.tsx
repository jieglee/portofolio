"use client";
import { create } from "zustand";
import { type ContentItem, type SocialStats, SOCIAL_STATS } from "@/common/constants/creations";

type CreationsState = {
    tiktokVideos: ContentItem[] | null;
    tiktokStats: SocialStats | null;
    igPosts: ContentItem[] | null;
    igStats: SocialStats | null;
    tiktokLoading: boolean;
    igLoading: boolean;
    fetched: { tiktok: boolean; instagram: boolean };

    fetchTikTok: () => Promise<void>;
    fetchInstagram: () => Promise<void>;
    setTiktokVideos: (videos: ContentItem[]) => void;
    setTiktokStats: (stats: SocialStats) => void;
    setIgPosts: (posts: ContentItem[]) => void;
    setIgStats: (stats: SocialStats) => void;
};

export const useCreationsStore = create<CreationsState>()((set, get) => ({
    tiktokVideos: null,
    tiktokStats: null,
    igPosts: null,
    igStats: null,
    tiktokLoading: false,
    igLoading: false,
    fetched: { tiktok: false, instagram: false },

    fetchTikTok: async () => {
        if (get().fetched.tiktok) return;
        set({ tiktokLoading: true });
        try {
            const res = await fetch("/api/tiktok");
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();

            const videos: ContentItem[] = data.videos?.length ? data.videos : [];
            const stats: SocialStats | null = data.stats
                ? {
                      ...SOCIAL_STATS.tiktok,
                      ...Object.fromEntries(
                          Object.entries(data.stats).filter(([, v]) => v !== "" && v !== null && v !== undefined)
                      ),
                  }
                : null;

            set({
                tiktokVideos: videos.length ? videos : null,
                tiktokStats: stats,
                fetched: { ...get().fetched, tiktok: true },
            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Unknown error";
            console.warn("[useCreationsStore] TikTok fetch failed:", msg);
            set({ fetched: { ...get().fetched, tiktok: true } });
        } finally {
            set({ tiktokLoading: false });
        }
    },

    fetchInstagram: async () => {
        if (get().fetched.instagram) return;
        set({ igLoading: true });
        try {
            const res = await fetch("/api/instagram");
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();

            const posts: ContentItem[] = data.posts?.length ? data.posts : [];
            const stats: SocialStats | null = data.stats
                ? {
                      ...SOCIAL_STATS.instagram,
                      ...Object.fromEntries(
                          Object.entries(data.stats).filter(([, v]) => v !== "" && v !== null && v !== undefined)
                      ),
                  }
                : null;

            set({
                igPosts: posts.length ? posts : null,
                igStats: stats,
                fetched: { ...get().fetched, instagram: true },
            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Unknown error";
            console.warn("[useCreationsStore] Instagram fetch failed:", msg);
            set({ fetched: { ...get().fetched, instagram: true } });
        } finally {
            set({ igLoading: false });
        }
    },

    setTiktokVideos: (videos) => set({ tiktokVideos: videos }),
    setTiktokStats: (stats) => set({ tiktokStats: stats }),
    setIgPosts: (posts) => set({ igPosts: posts }),
    setIgStats: (stats) => set({ igStats: stats }),
}));
