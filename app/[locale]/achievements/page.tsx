"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const achievements = [
  {
    id: 1,
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "November 2024",
    credential: "2VX3R7DL3ZYQ",
    link: "https://www.dicoding.com/certificates/2VX3R7DL3ZYQ",
    type: "Certificate",
    image: "public/images/sertifikat-dicoding-1.png",
    tags: ["Web", "Programming"],
  },
];

export default function AchievementsPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="px-6 py-10 lg:px-12">
      <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
        Achievements
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A collection of certificates and badges I have earned throughout my
        professional and academic journey.
      </p>

      <div className="my-6 border-t border-dashed border-border" />

      <div className="relative w-64">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Total: {achievements.length}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) =>
          isDark ? (
            <SpotlightCard
              key={item.id}
              className="!p-0 !rounded-2xl !bg-neutral-900 !border-neutral-800"
              spotlightColor="rgba(255, 255, 255, 0.2)"
            >
              <CardContent item={item} />
            </SpotlightCard>
          ) : (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <CardContent item={item} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function CardContent({ item }: { item: typeof achievements[0] }) {
  return (
    
      < a href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 font-semibold text-white">
            Show Details
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <span className="text-xs font-mono text-muted-foreground">
          {item.credential}
        </span>
        <h3 className="font-bold text-foreground leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground">{item.issuer}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-0.5 text-xs text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Issued on {item.date}
        </p>
      </div>
    </a>
  );
}