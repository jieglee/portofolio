"use client";

import { useEffect, useState } from "react";
import { Github, Users, BookOpen, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { GithubProfile, GithubRepo } from "@/common/constants/dashboard";

export default function GithubProfileCard() {
  const t = useTranslations("Dashboard.GithubProfile");
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github/profile");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setProfile(data.profile);
        setRepos(data.repos);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-foreground" />
        <span className="text-sm font-semibold text-foreground">{t("title")}</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-muted animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
            <div className="h-2.5 w-16 rounded bg-muted animate-pulse" />
            <div className="h-2.5 w-32 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ) : profile ? (
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-11 h-11 rounded-full border border-border"
          />
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-semibold text-foreground">{profile.name || profile.login}</span>
            <span className="text-[11px] text-muted-foreground">@{profile.login}</span>
            {profile.bio && (
              <span className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{profile.bio}</span>
            )}
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 bg-muted/40 rounded-lg px-2.5 py-2 border border-border">
              <div className="h-2 w-6 rounded bg-muted animate-pulse" />
              <div className="h-3.5 w-5 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      ) : profile ? (
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { icon: Users, label: t("followers"), value: profile.followers },
            { icon: Users, label: t("following"), value: profile.following },
            { icon: BookOpen, label: t("repos"), value: profile.public_repos },
            { icon: Star, label: t("stars"), value: totalStars },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5 bg-muted/40 rounded-lg px-2.5 py-2 border border-border">
              <span className="text-[9px] text-muted-foreground uppercase tracking-wide flex items-center gap-0.5">
                <s.icon className="w-2.5 h-2.5" />
                {s.label}
              </span>
              <span className="text-sm font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
