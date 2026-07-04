"use client";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Introduction() {
    const t = useTranslations("About");
    return (
        <section>
            <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t("introduction")}
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <motion.div
                className="flex flex-col gap-6"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col gap-4">
                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground text-justify">
                        {t("bio1")}
                    </motion.p>
                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground text-justify">
                        {t("bio2")}
                    </motion.p>
                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground text-justify">
                        {t("bio3")}
                    </motion.p>
                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground text-justify">
                        {t("bio4")}
                    </motion.p>
                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground text-justify">
                        {t("bio5")}
                    </motion.p>
                </div>

                <motion.div variants={item} className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">{t("warmRegards")}</p>
                    <Image
                        src="/images/sign-runa.png"
                        alt="Signature"
                        width={120}
                        height={48}
                        className="opacity-90"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
