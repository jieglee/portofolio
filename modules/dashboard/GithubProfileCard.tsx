"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Users, BookOpen, Star, GitFork } from "lucide-react";
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

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-foreground" />
        <span className="text-sm font-semibold text-foreground">
          {t("title")}
        </span>
      </div>

      {/* Profile */}
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-3 w-36 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ) : profile ? (
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-12 h-12 rounded-full border border-border"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {profile.name || profile.login}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-[180px]">
              {profile.bio || `@${profile.login}`}
            </span>
          </div>
        </div>
      ) : null}

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 bg-muted/40 rounded-lg px-3 py-2 border border-border"
            >
              <div className="h-2.5 w-8 rounded bg-muted animate-pulse" />
              <div className="h-4 w-6 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      ) : profile ? (
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              icon: Users,
              label: t("followers"),
              value: profile.followers,
            },
            {
              icon: BookOpen,
              label: t("repos"),
              value: profile.public_repos,
            },
            {
              icon: Users,
              label: t("following"),
              value: profile.following,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-0.5 bg-muted/40 rounded-lg px-3 py-2 border border-border"
            >
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {s.label}
              </span>
              <span className="text-base font-bold text-foreground">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Top Repos */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {t("topRepos")}
        </span>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-lg bg-muted animate-pulse"
              />
            ))
          : repos.slice(0, 3).map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2 border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">
                    {repo.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    {repo.description || t("noDescription")}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
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
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <GitFork className="w-2.5 h-2.5" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
      </div>
    </div>
  );
}
