"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Star, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import type { GithubProfile, GithubRepo } from "@/common/constants/dashboard";

export default function GithubReposCard() {
  const t = useTranslations("Dashboard.GithubProfile");
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github/profile");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setProfile(data.profile);
        setRepos(data.repos);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <FolderGit2 className="w-4 h-4 text-foreground" />
        <span className="text-sm font-semibold text-foreground">{t("repositories")}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-11 rounded-lg bg-muted animate-pulse" />
            ))
          : repos.slice(0, 3).map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between bg-muted/40 rounded-lg px-2.5 py-2 border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">{repo.name}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{repo.description || t("noDescription")}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {repo.language && (
                    <span className="text-[10px] text-muted-foreground">{repo.language}</span>
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

      {!loading && profile && (
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5 rounded-lg border border-border hover:border-foreground/20 mt-auto"
        >
          {t("viewAll")}
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  );
}
