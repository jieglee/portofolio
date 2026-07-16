"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Users, BookOpen, Star, ExternalLink, FolderGit2 } from "lucide-react";
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
      <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* ── GitHub Profile Card ── */}
      <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {t("title")}
          </span>
        </div>

        {/* Profile */}
        {loading ? (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-28 rounded bg-muted animate-pulse" />
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
              <div className="h-3 w-40 rounded bg-muted animate-pulse" />
            </div>
          </div>
        ) : profile ? (
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-16 h-16 rounded-full border border-border"
            />
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-semibold text-foreground">
                {profile.name || profile.login}
              </span>
              <span className="text-xs text-muted-foreground">
                @{profile.login}
              </span>
              {profile.bio && (
                <span className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {profile.bio}
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 bg-muted/40 rounded-lg px-3 py-2.5 border border-border"
              >
                <div className="h-2.5 w-8 rounded bg-muted animate-pulse" />
                <div className="h-4 w-6 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        ) : profile ? (
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Users, label: t("followers"), value: profile.followers },
              { icon: Users, label: t("following"), value: profile.following },
              {
                icon: BookOpen,
                label: t("repos"),
                value: profile.public_repos,
              },
              { icon: Star, label: t("stars"), value: totalStars },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-0.5 bg-muted/40 rounded-lg px-3 py-2.5 border border-border"
              >
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <s.icon className="w-3 h-3" />
                  {s.label}
                </span>
                <span className="text-base font-bold text-foreground">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* ── Repositories Card ── */}
      <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {t("repositories")}
          </span>
        </div>

        {/* Repo List */}
        <div className="flex flex-col gap-2">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-lg bg-muted animate-pulse"
                />
              ))
            : repos.slice(0, 3).map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2.5 border border-border hover:border-foreground/20 transition-colors"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-foreground truncate">
                      {repo.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate">
                      {repo.description || t("noDescription")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {repo.language && (
                      <span className="text-[10px] text-muted-foreground">
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Star className="w-2.5 h-2.5" />
                        {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
        </div>

        {/* View All */}
        {!loading && profile && (
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5 rounded-lg border border-border hover:border-foreground/20"
          >
            {t("viewAll")}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
