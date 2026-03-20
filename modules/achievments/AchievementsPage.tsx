"use client";
import { useState, useEffect } from "react";
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
    category: "Web Development",
    image: "/images/sertifikat-dicoding-1.png",
    tags: ["Web", "Programming"],
  },
];

type Achievement = (typeof achievements)[0];

export default function AchievementsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = achievements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.issuer.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const openModal = (item: Achievement, e: React.MouseEvent) => {
    e.preventDefault();
    setSelected(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelected(null), 300);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalVisible]);

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

      {/* Search */}
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Total: {filtered.length}
      </p>

      {/* Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) =>
          isDark ? (
            <SpotlightCard
              key={item.id}
              className="!p-0 !rounded-2xl !bg-neutral-900 !border-neutral-800"
              spotlightColor="rgba(255, 255, 255, 0.15)"
            >
              <CardContent item={item} onShowDetail={openModal} />
            </SpotlightCard>
          ) : (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
            >
              <CardContent item={item} onShowDetail={openModal} />
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            modalVisible
              ? "bg-black/60 backdrop-blur-sm opacity-100"
              : "bg-black/0 opacity-0 pointer-events-none"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-300 md:flex-row ${
              modalVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="relative flex-1 min-h-[240px] md:min-h-[360px] bg-muted overflow-hidden">
              <img
                src={selected.image}
                alt={selected.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Detail Side */}
            <div className="flex w-full flex-col gap-4 p-6 md:w-72 md:flex-shrink-0">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-border hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <div>
                <h2 className="pr-6 text-lg font-bold leading-snug text-foreground">
                  {selected.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selected.issuer}
                </p>
              </div>

              <div className="border-t border-dashed border-border" />

              <div className="flex flex-col gap-3 text-sm">
                <DetailRow
                  label="CREDENTIAL ID"
                  value={selected.credential}
                  mono
                />
                <DetailRow label="TYPE" value={selected.type} />
                <DetailRow label="CATEGORY" value={selected.category} />
                <DetailRow label="ISSUE DATE" value={selected.date} />
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-0.5 text-xs text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-2">
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-80"
                >
                  View Certificate
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={`text-sm font-medium text-foreground ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function CardContent({
  item,
  onShowDetail,
}: {
  item: Achievement;
  onShowDetail: (item: Achievement, e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl"
      onClick={(e) => onShowDetail(item, e)}
    >
      {/* Image with layered overlays */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-[0.4]"
        />

        {/* Bottom gradient always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Type badge top-left */}
        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm border border-white/10">
          {item.type}
        </span>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            Show Details
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Issuer + credential pinned bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-xs font-medium text-white/80">{item.issuer}</span>
          <span className="font-mono text-[10px] text-white/50">{item.credential}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {item.title}
        </h3>

        {/* Tags + Date row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="shrink-0 whitespace-nowrap text-[10px] text-muted-foreground">
            {item.date}
          </span>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-0.5 w-0 bg-gradient-to-r from-foreground/40 to-foreground/10 transition-all duration-500 group-hover:w-full" />
    </a>
  );
}