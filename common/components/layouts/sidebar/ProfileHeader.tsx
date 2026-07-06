"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { motion } from "framer-motion";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
    expandMenu: boolean;
    imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
    const t = useTranslations("Common");
    return (
        <div
            className={cn(
                "flex w-full grow items-center gap-3 lg:flex-col lg:gap-0",
                expandMenu && "flex-col items-start!",
            )}
        >
            {/* Avatar + spinning decorative ring */}
            <div className="relative">
                <div
                    className="absolute inset-0 rounded-full animate-spin-slow"
                    style={{
                        background: "conic-gradient(from 0deg, transparent, #f472b6, transparent, #a78bfa, transparent, #f472b6)",
                        WebkitMask: "radial-gradient(circle, transparent 48%, black 49%, black 51%, transparent 52%)",
                        mask: "radial-gradient(circle, transparent 48%, black 49%, black 51%, transparent 52%)",
                    }}
                />
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        width: expandMenu ? 60 : imageSize,
                        height: expandMenu ? 60 : imageSize,
                    }}
                    className="relative rounded-full overflow-hidden ring-2 ring-border lg:hover:ring-primary"
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
                        <h2 className="text-base font-semibold text-foreground transition-colors hover:text-foreground/70 lg:text-lg">  {/* ⬅️ text-foreground */}
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