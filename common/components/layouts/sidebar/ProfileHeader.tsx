"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { motion } from "framer-motion";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
    expandMenu: boolean;
    imageSize: number;
}

const THEME_COLORS = {
    light: { bow: "#ec4899", knot: "#be185d", trail: "#f472b6" },
    dark:  { bow: "#818cf8", knot: "#4f46e5", trail: "#a5b4fc" },
    pink:  { bow: "#f472b6", knot: "#db2777", trail: "#fda4af" },
};

function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function BowCanvas({ size, theme }: { size: number; theme: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const angleRef = useRef<number>(0);
    const trailRef = useRef<{ x: number; y: number; a: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const S = size;
        const cx = S / 2;
        const cy = S / 2;
        const R = S / 2 - 5;
        const TRAIL_DEG = 210;
        const MAX_PTS = Math.round(TRAIL_DEG / (0.016 * 180 / Math.PI));

        // clear trail on theme/size change
        trailRef.current = [];

        const colors =
            THEME_COLORS[theme as keyof typeof THEME_COLORS] ?? THEME_COLORS.light;

        function drawBow(x: number, y: number, angle: number) {
            if (!ctx) return;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2);
            const sc = S / 110;

            ctx.beginPath();
            ctx.ellipse(-6 * sc, 0, 7 * sc, 4.5 * sc, -0.4, 0, Math.PI * 2);
            ctx.fillStyle = colors.bow;
            ctx.globalAlpha = 0.95;
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(6 * sc, 0, 7 * sc, 4.5 * sc, 0.4, 0, Math.PI * 2);
            ctx.fillStyle = colors.bow;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, 2.8 * sc, 0, Math.PI * 2);
            ctx.fillStyle = colors.knot;
            ctx.globalAlpha = 1;
            ctx.fill();

            ctx.restore();
        }

        function tick() {
            angleRef.current += 0.016;
            const a = angleRef.current;
            const bx = cx + Math.cos(a) * R;
            const by = cy + Math.sin(a) * R;

            trailRef.current.push({ x: bx, y: by, a });
            if (trailRef.current.length > MAX_PTS) trailRef.current.shift();

            ctx.clearRect(0, 0, S, S);

            // solid fade trail
            const rgb = hexToRgb(colors.trail);
            const trail = trailRef.current;
            for (let i = 1; i < trail.length; i++) {
                const progress = i / trail.length;
                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x, trail[i].y);
                ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${progress * 0.78})`;
                ctx.lineWidth = 1.4 + progress * 2;
                ctx.lineCap = "round";
                ctx.stroke();
            }

            drawBow(bx, by, a);
            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [size, theme]);

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 10,
            }}
        />
    );
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
    const t = useTranslations("Common");
    const { resolvedTheme } = useTheme();

    const canvasSize = expandMenu ? 60 : imageSize;

    // map resolvedTheme → THEME_COLORS key
    const themeKey =
        resolvedTheme === "dark" ? "dark"
        : resolvedTheme === "pink" ? "pink"
        : "light";

    return (
        <div
            className={cn(
                "flex w-full grow items-center gap-3 lg:flex-col lg:gap-0",
                expandMenu && "flex-col items-start!",
            )}
        >
            {/* Avatar + bow canvas */}
            <div
                className="relative"
                style={{ width: canvasSize, height: canvasSize }}
            >
                <BowCanvas size={canvasSize} theme={themeKey} />

                <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-full overflow-hidden ring-2 ring-border lg:hover:ring-primary"
                    style={{ margin: 5 }}
                >
                    <Image
                        src="/images/runa gemoy.jpeg"
                        fill
                        alt="Anindita Amantaruna"
                        className="object-cover"
                        rounded="rounded-full"
                    />
                </motion.div>
            </div>

            {/* Name + handle */}
            <div className="flex flex-col items-center gap-0.5 lg:mt-4">
                <div className="flex items-center gap-1.5">
                    <Link href="/" passHref>
                        <h2 className="text-base font-semibold text-foreground transition-colors hover:text-foreground/70 lg:text-lg">
                            Runa
                        </h2>
                    </Link>
                    <Tooltip title={t("verified")}>
                        <VerifiedIcon size={16} className="text-blue-400" />
                    </Tooltip>
                </div>

                <span className="hidden text-xs text-muted-foreground lg:block">
                    @whoszie._
                </span>
            </div>
        </div>
    );
};

export default ProfileHeader;