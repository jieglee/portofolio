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
    light: { fill: "#f9a8d4", stroke: "#db2777", trail: "#f472b6", knot: "#ec4899" },
    dark:  { fill: "#a5b4fc", stroke: "#4f46e5", trail: "#818cf8", knot: "#6366f1" },
    pink:  { fill: "#fda4af", stroke: "#be185d", trail: "#f472b6", knot: "#ec4899" },
};

function hexToRgb(hex: string) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
    };
}

function drawRibbonBow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    bowAngle: number,
    T: typeof THEME_COLORS.light,
    sc: number
) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(bowAngle + Math.PI / 2);

    // Left wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-3*sc, -4*sc, -14*sc, -11*sc, -11*sc, -2*sc);
    ctx.bezierCurveTo(-14*sc,  4*sc,  -3*sc,   5*sc,   0,      0);
    ctx.fillStyle = T.fill; ctx.strokeStyle = T.stroke;
    ctx.lineWidth = 0.8 * sc; ctx.globalAlpha = 0.95;
    ctx.fill(); ctx.stroke();

    // Right wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo( 3*sc, -4*sc,  14*sc, -11*sc,  11*sc, -2*sc);
    ctx.bezierCurveTo(14*sc,  4*sc,   3*sc,   5*sc,   0,      0);
    ctx.fillStyle = T.fill; ctx.strokeStyle = T.stroke;
    ctx.fill(); ctx.stroke();

    // Left tail
    ctx.beginPath();
    ctx.moveTo(-1.5*sc, 1*sc);
    ctx.bezierCurveTo(-4*sc,  5*sc, -7*sc,  9*sc, -5*sc, 12*sc);
    ctx.lineTo(-2*sc, 12*sc);
    ctx.bezierCurveTo(-3*sc, 9*sc, 0, 5*sc, 1.5*sc, 1*sc);
    ctx.fillStyle = T.fill; ctx.strokeStyle = T.stroke;
    ctx.fill(); ctx.stroke();

    // Right tail
    ctx.beginPath();
    ctx.moveTo(1.5*sc, 1*sc);
    ctx.bezierCurveTo( 4*sc,  5*sc,  7*sc,  9*sc,  5*sc, 12*sc);
    ctx.lineTo(2*sc, 12*sc);
    ctx.bezierCurveTo(3*sc, 9*sc, 0, 5*sc, -1.5*sc, 1*sc);
    ctx.fillStyle = T.fill; ctx.strokeStyle = T.stroke;
    ctx.fill(); ctx.stroke();

    // Center knot
    ctx.beginPath();
    ctx.ellipse(0, 0, 2.8*sc, 2.8*sc, 0, 0, Math.PI * 2);
    ctx.fillStyle = T.knot; ctx.globalAlpha = 1;
    ctx.fill();
    ctx.strokeStyle = T.stroke; ctx.lineWidth = 0.6 * sc; ctx.stroke();

    ctx.restore();
}

function BowCanvas({ size, theme }: { size: number; theme: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef    = useRef<number>(0);
    const angleRef  = useRef<number>(0);
    const trailRef  = useRef<{ x: number; y: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        trailRef.current = [];

        const S   = size;
        const cx  = S / 2;
        const cy  = S / 2;
        const R   = S / 2 - 8;
        const sc  = S / 110;
        const MAX = Math.round(200 / (0.016 * 180 / Math.PI));

        const T = THEME_COLORS[theme as keyof typeof THEME_COLORS] ?? THEME_COLORS.light;

        function tick() {
            if (!ctx) return;
            angleRef.current += 0.016;
            const a  = angleRef.current;
            const bx = cx + Math.cos(a) * R;
            const by = cy + Math.sin(a) * R;

            trailRef.current.push({ x: bx, y: by });
            if (trailRef.current.length > MAX) trailRef.current.shift();

            ctx.clearRect(0, 0, S, S);

            // solid fade trail
            const rgb   = hexToRgb(T.trail);
            const trail = trailRef.current;
            for (let i = 1; i < trail.length; i++) {
                const p = i / trail.length;
                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x,     trail[i].y);
                ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p * 0.75})`;
                ctx.lineWidth   = 1.2 + p * 2.2;
                ctx.lineCap     = "round";
                ctx.stroke();
            }

            drawRibbonBow(ctx, bx, by, a, T, sc);
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
                position:      "absolute",
                inset:         0,
                width:         "100%",
                height:        "100%",
                pointerEvents: "none",
                zIndex:        10,
            }}
        />
    );
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
    const t = useTranslations("Common");
    const { resolvedTheme } = useTheme();

    const canvasSize = expandMenu ? 68 : imageSize + 16;

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
            {/* Avatar + ribbon bow canvas */}
            <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.2 }}
                className="relative"
                style={{ width: canvasSize, height: canvasSize }}
            >
                <BowCanvas size={canvasSize} theme={themeKey} />

                <div
                    className="absolute rounded-full overflow-hidden ring-2 ring-border lg:hover:ring-primary"
                    style={{
                        inset:  8,
                        top:    8,
                        left:   8,
                        right:  8,
                        bottom: 8,
                    }}
                >
                    <Image
                        src="/images/runa gemoy.jpeg"
                        fill
                        alt="Anindita Amantaruna"
                        className="object-cover"
                        rounded="rounded-full"
                    />
                </div>
            </motion.div>

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
