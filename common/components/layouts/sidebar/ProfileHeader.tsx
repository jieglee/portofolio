"use client";
import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToogle";
import IntlToggle from "./IntToogle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import { cn } from "@/lib/utils";
import LayoutToggleButton from "../LayoutToogleButton";

interface ProfileHeaderProps {
    expandMenu: boolean;
    imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
    return (
        <div
            className={cn(
                "flex w-full grow items-center gap-4 lg:flex-col lg:gap-0",
                expandMenu && "flex-col items-start!",
            )}
        >
            {/* Avatar + status dot */}
            <div className="relative">
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        width: expandMenu ? 72 : imageSize,
                        height: expandMenu ? 72 : imageSize,
                    }}
                    className="rounded-full overflow-hidden ring-2 ring-border lg:hover:ring-primary"  // ⬅️ pakai ring-border & ring-primary
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
                    <Tooltip title="Verified">
                        <VerifiedIcon size={16} className="text-blue-400" />
                    </Tooltip>
                </div>

                <span className="hidden text-xs text-muted-foreground lg:block">  
                    @whoszie._
                </span>
            </div>

            {/* Toggles */}
            <div className={cn(
                "hidden items-center justify-center gap-2 lg:flex lg:mt-6",
                expandMenu && "mt-2"
            )}>
                <IntlToggle />
                <ThemeToggle />
                <LayoutToggleButton />
            </div>
        </div>
    );
};

export default ProfileHeader;