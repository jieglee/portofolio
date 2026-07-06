"use client";

import { useRef, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Smartphone, ChevronRight, ChevronLeft, Play, Eye, Heart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ContentItem } from "@/common/constants/creations";

const MAX_VIDEOS = 10;
const PAGE_SIZE = 1;

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
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="w-[120px] md:w-[140px] lg:w-[160px] flex-shrink-0 snap-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block rounded-[24px] overflow-hidden border border-border/50 bg-muted/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-border/80"
        style={{ aspectRatio: "2/3" }}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 gap-1.5"
        >
          <p className="text-white text-[11px] font-medium leading-snug line-clamp-2">{video.title}</p>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-white/80 text-[10px]">
              <Eye className="w-2.5 h-2.5" />
              {video.views}
            </span>
            <span className="flex items-center gap-1 text-white/80 text-[10px]">
              <Heart className="w-2.5 h-2.5" />
              {video.likes}
            </span>
          </div>
        </motion.div>
      </a>
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
      className="w-[120px] md:w-[140px] lg:w-[160px] flex-shrink-0 snap-start"
    >
      <Link href="/creations" className="group/cta block h-full">
        <div className="relative h-full rounded-[24px] overflow-hidden border-2 border-dashed border-border/60 bg-card/60 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:border-border">
          <div className="flex flex-col items-center justify-center h-full p-4 text-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-foreground" />
            </div>
            <h3 className="text-[11px] font-semibold text-foreground">
              {t("see_all_creations")}
            </h3>
            <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover/cta:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CreationsSection() {
  const t = useTranslations("Creations");
  const scrollRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const preventWheel = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", preventWheel, { passive: false });
    return () => el.removeEventListener("wheel", preventWheel);
  }, []);

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
            <Smartphone className="w-5 h-5" />
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home_subtitle")}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">

          <div
            ref={scrollRef}
            className="scrollbar-hide-custom flex gap-4 overflow-x-auto px-6 lg:px-12 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
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
