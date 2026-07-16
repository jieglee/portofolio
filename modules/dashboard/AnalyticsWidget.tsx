"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const MOCK = {
  visitors: 1240,
  pageViews: 3870,
  bounceRate: "34%",
  avgVisit: "3m 12s",
  topPages: [
    { path: "/", views: 1240 },
    { path: "/projects", views: 820 },
    { path: "/about", views: 610 },
    { path: "/creations", views: 390 },
    { path: "/dashboard", views: 280 },
  ],
  topCountries: [
    { name: "Indonesia", pct: 68 },
    { name: "United States", pct: 12 },
    { name: "Singapore", pct: 8 },
    { name: "Malaysia", pct: 6 },
  ],
};

export default function AnalyticsWidget() {
  const t = useTranslations("Dashboard.Analytics");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const d = MOCK;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {t("title")}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs text-yellow-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          Mock
        </span>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: t("visitors"), value: d.visitors.toLocaleString() },
          { label: t("pageViews"), value: d.pageViews.toLocaleString() },
          { label: t("bounceRate"), value: d.bounceRate },
          { label: t("avgVisit"), value: d.avgVisit },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-0.5 bg-muted/40 rounded-lg px-3 py-2.5 border border-border"
          >
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {s.label}
            </span>
            <span className="text-base font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Top pages */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {t("topPages")}
        </span>
        {d.topPages.map((p) => {
          const maxV = d.topPages[0].views;
          const pct = (p.views / maxV) * 100;
          return (
            <div key={p.path} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-24 truncate">
                {p.path}
              </span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground/30 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground w-10 text-right">
                {p.views.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Top countries */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {t("topCountries")}
        </span>
        {d.topCountries.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-24 truncate">
              {c.name}
            </span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{ width: `${c.pct}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground w-8 text-right">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
