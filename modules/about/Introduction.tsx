"use client";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

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
                className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col gap-4">
                    <motion.div variants={item}>
                        <h2 className="text-xl font-bold text-foreground">
                            Anindita Amantaruna Putri Roswanto
                        </h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {t("role")}
                        </p>
                    </motion.div>

                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                        {t("bio1")}
                    </motion.p>

                    <motion.p variants={item} className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                        {t("bio2")}
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}