"use client";

import { useRef, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Smartphone, ChevronRight, ChevronLeft, Play, Eye, Heart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ContentItem } from "@/common/constants/creations";

const MAX_VIDEOS = 10;
const PAGE_SIZE = 2;

const FALLBACK_VIDEOS: ContentItem[] = [
  {
    id: "fb1",
    platform: "tiktok",
    thumbnail: "https://placehold.co/360x480/1a1a2e/ffffff?text=TikTok+1",
    title: "Loading TikTok videos...",
    views: "—",
    likes: "—",
    url: "https://www.tiktok.com/@whoszie._",
    date: "",
  },
  {
    id: "fb2",
    platform: "tiktok",
    thumbnail: "https://placehold.co/360x480/16213e/ffffff?text=TikTok+2",
    title: "Loading TikTok videos...",
    views: "—",
    likes: "—",
    url: "https://www.tiktok.com/@whoszie._",
    date: "",
  },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

function VideoCard({ video, index }: { video: ContentItem; index: number }) {
  const t = useTranslations("Creations");
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group/card w-[130px] md:w-[145px] lg:w-[160px] flex-shrink-0 snap-start"
    >
      <div className="relative rounded-[24px] overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:border-border/80">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            sizes="(max-width: 768px) 130px, (max-width: 1024px) 145px, 160px"
          />
        </div>

        <div className="p-2.5 space-y-1">
          <h3 className="text-[11px] font-semibold text-foreground leading-snug line-clamp-1">
            {video.title}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
              <Eye className="w-2 h-2" />
              {video.views}
            </span>
            <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
              <Heart className="w-2 h-2" />
              {video.likes}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 rounded-[24px]">
          <motion.a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium hover:bg-white/25 transition-colors"
          >
            <Play className="w-2.5 h-2.5 fill-white" />
            {t("watch")}
          </motion.a>
          <motion.a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium hover:bg-white/25 transition-colors"
          >
            {t("view_post")}
            <ArrowRight className="w-2.5 h-2.5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function CTACard() {
  const t = useTranslations("Creations");
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[130px] md:w-[145px] lg:w-[160px] flex-shrink-0 snap-start"
    >
      <Link href="/creations" className="group/cta block h-full">
        <div className="relative h-full rounded-[24px] overflow-hidden border border-border/50 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover/cta:scale-[1.03] group-hover/cta:border-blue-500/30 group-hover/cta:shadow-blue-500/5">
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="mb-2.5 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-xs font-semibold text-foreground mb-1">
              {t("see_all")}
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-3 max-w-[120px]">
              {t("see_all_desc")}
            </p>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-400"
            >
              {t("explore")}
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CreationsSection() {
  const t = useTranslations("Creations");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [videos, setVideos] = useState<ContentItem[] | null>(null);

  useEffect(() => {
    const fetchTikTok = async () => {
      try {
        const res = await fetch("/api/tiktok");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (data.videos?.length) setVideos(data.videos);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        console.warn("[CreationsSection] TikTok fetch failed:", msg);
      }
    };
    fetchTikTok();
  }, []);

  const items = (videos ?? FALLBACK_VIDEOS).slice(0, MAX_VIDEOS);
  const totalCards = items.length + 1;
  const totalPages = Math.ceil(totalCards / PAGE_SIZE);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const idx = Math.round(progress * (totalCards - 1));
      setActiveIndex(Math.min(idx, totalCards - 1));
      setCanScrollLeft(scrollLeft > 16);
      setCanScrollRight(scrollLeft < maxScroll - 16);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [totalCards]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.pageX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.pageX - dragStart.x;
    el.scrollLeft = dragStart.scrollLeft - dx;
  };

  const handlePointerUp = () => setIsDragging(false);

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 130 + 16;
    el.scrollBy({ left: cardWidth * PAGE_SIZE, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 130 + 16;
    el.scrollBy({ left: -(cardWidth * PAGE_SIZE), behavior: "smooth" });
  };

  const activePage = Math.floor(activeIndex / PAGE_SIZE);

  return (
    <>
      <style>{`
        .scrollbar-hide-custom::-webkit-scrollbar { display: none; }
      `}</style>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-[120px]"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home_subtitle")}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div
            ref={scrollRef}
            className="scrollbar-hide-custom flex gap-4 overflow-x-auto px-6 lg:px-12 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: isDragging ? "grabbing" : "grab",
              WebkitOverflowScrolling: "touch",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {items.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
            <CTACard />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, p) => (
              <button
                key={p}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardWidth = 130 + 16;
                  el.scrollTo({ left: cardWidth * p * PAGE_SIZE, behavior: "smooth" });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  p === activePage
                    ? "w-6 bg-foreground"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to page ${p + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground shadow-lg transition-all duration-300 hover:bg-muted"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
            )}
            <button
              onClick={scrollRight}
              className={`w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground shadow-lg transition-all duration-300 hover:bg-muted ${
                !canScrollRight ? "opacity-30 cursor-not-allowed" : ""
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
