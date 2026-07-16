"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Star, GitFork, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiPhp,
  SiRust, SiGo, SiDart, SiHtml5, SiCss, SiReact, SiVuedotjs, SiSvelte, SiKotlin, SiSwift, SiRuby,
} from "react-icons/si";
import type { GithubProfile, GithubRepo } from "@/common/constants/dashboard";

const LANG_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  TypeScript:  { icon: <SiTypescript size={14} color="#fff" />,   color: "#fff", bg: "#3178C6" },
  JavaScript:  { icon: <SiJavascript size={14} color="#000" />,   color: "#000", bg: "#F7DF1E" },
  Python:      { icon: <SiPython size={14} color="#fff" />,       color: "#fff", bg: "#3776AB" },
  PHP:         { icon: <SiPhp size={14} color="#fff" />,          color: "#fff", bg: "#777BB4" },
  Rust:        { icon: <SiRust size={14} color="#fff" />,         color: "#fff", bg: "#dea584" },
  Go:          { icon: <SiGo size={14} color="#fff" />,           color: "#fff", bg: "#00ADD8" },
  Dart:        { icon: <SiDart size={14} color="#fff" />,         color: "#fff", bg: "#0175C2" },
  HTML:        { icon: <SiHtml5 size={14} color="#fff" />,        color: "#fff", bg: "#E34C26" },
  CSS:         { icon: <SiCss size={14} color="#fff" />,         color: "#fff", bg: "#1572B6" },
  React:       { icon: <SiReact size={14} color="#fff" />,        color: "#fff", bg: "#149ECA" },
  Vue:         { icon: <SiVuedotjs size={14} color="#fff" />,     color: "#fff", bg: "#41b883" },
  Svelte:      { icon: <SiSvelte size={14} color="#fff" />,       color: "#fff", bg: "#ff3e00" },
  Kotlin:      { icon: <SiKotlin size={14} color="#fff" />,       color: "#fff", bg: "#A97BFF" },
  Swift:       { icon: <SiSwift size={14} color="#fff" />,        color: "#fff", bg: "#F05138" },
  Ruby:        { icon: <SiRuby size={14} color="#fff" />,         color: "#fff", bg: "#701516" },
};

const LANG_DOT_COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", Python: "#3776AB",
  PHP: "#777BB4", Rust: "#dea584", Go: "#00ADD8", Dart: "#0175C2",
  HTML: "#E34C26", CSS: "#1572B6", Vue: "#41b883", Svelte: "#ff3e00",
  Kotlin: "#A97BFF", Swift: "#F05138", Ruby: "#701516",
};

function RepoIcon({ language }: { language: string | null }) {
  if (language && LANG_META[language]) {
    const meta = LANG_META[language];
    return (
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
        style={{ background: meta.bg }}
      >
        {meta.icon}
      </div>
    );
  }
  // fallback: next.js style icon
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-border bg-muted">
      <SiNextdotjs size={14} className="text-foreground" />
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

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
      } catch { /* silent */ }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FolderGit2 className="w-4 h-4 text-foreground" />
        <span className="text-sm font-semibold text-foreground">{t("repositories")}</span>
      </div>

      {/* Repo list */}
      <div className="flex flex-col gap-2.5">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5 pt-0.5">
                  <div className="h-3 w-28 bg-muted rounded animate-pulse" />
                  <div className="h-2.5 w-40 bg-muted rounded animate-pulse" />
                  <div className="h-2.5 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))
          : repos.slice(0, 3).map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.06 }}
                className="flex items-start gap-3 hover:bg-muted/30 rounded-xl px-1 py-1 -mx-1 transition-colors group"
              >
                {/* Icon */}
                <RepoIcon language={repo.language} />

                {/* Info */}
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-foreground group-hover:underline truncate">
                    {repo.name}
                  </span>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 leading-relaxed">
                    {repo.description || t("noDescription")}
                  </p>
                  {/* Meta */}
                  <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: LANG_DOT_COLORS[repo.language] ?? "#888" }}
                        />
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
                    <span className="text-[10px] text-muted-foreground ml-auto">
                      Updated {formatDate(repo.updated_at)}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
      </div>

      {/* Divider */}
      {!loading && <div className="h-px bg-border" />}

      {/* View all repositories — footer */}
      {!loading && profile && (
        <a
          href={`${profile.html_url}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5 group"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}