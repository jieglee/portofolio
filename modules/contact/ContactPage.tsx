"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

const pageContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const pageItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const cardGrid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardItem: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const socials = [
    {
        id: "gmail",
        labelKey: "cardGmailTitle",
        descKey: "cardGmailDesc",
        btnKey: "cardGmailBtn",
        href: "mailto:aninditaamantaruna@gmail.com",
        span: "col-span-2",
        gradient: "from-red-600 via-red-500 to-rose-500",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-90">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
        ),
    },
    {
        id: "instagram",
        labelKey: "cardInstagramTitle",
        descKey: "cardInstagramDesc",
        btnKey: "cardInstagramBtn",
        href: "https://instagram.com/whoszie._",
        span: "col-span-1",
        gradient: "from-purple-600 via-pink-500 to-orange-400",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 opacity-90">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        id: "tiktok",
        labelKey: "cardTiktokTitle",
        descKey: "cardTiktokDesc",
        btnKey: "cardTiktokBtn",
        href: "https://tiktok.com/@whoszie._",
        span: "col-span-1",
        gradient: "from-neutral-700 via-neutral-600 to-neutral-500",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-90">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
            </svg>
        ),
    },
    {
        id: "telegram",
        labelKey: "cardTelegramTitle",
        descKey: "cardTelegramDesc",
        btnKey: "cardTelegramBtn",
        href: "https://t.me/whoszieeee",
        span: "col-span-1",
        gradient: "from-sky-500 via-blue-500 to-indigo-600",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-90">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.2.91-.74 1.13-1.5.71l-4.14-3.12-2 1.93c-.2.2-.37.36-.65.36z" />
            </svg>
        ),
    },
    {
        id: "discord",
        labelKey: "cardDiscordTitle",
        descKey: "cardDiscordDesc",
        btnKey: "cardDiscordBtn",
        href: "https://discord.com/users/zielagiee",
        span: "col-span-1",
        gradient: "from-indigo-600 via-violet-500 to-purple-600",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-90">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
            </svg>
        ),
    },
];

export default function ContactPage() {
    const t = useTranslations("Contact");
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSend = () => {
        if (!form.name || !form.email || !form.message) return;
        const subject = encodeURIComponent(`Message from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.open(`mailto:aninditaamantaruna@gmail.com?subject=${subject}&body=${body}`);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <motion.div
            className="px-6 py-10 lg:px-12"
            variants={pageContainer}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={pageItem}>
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{t("title")}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
            </motion.div>

            <motion.div variants={pageItem} className="my-6 border-t border-dashed border-border" />

            {/* Social label */}
            <motion.p variants={pageItem} className="mb-4 text-sm font-medium text-foreground">
                {t("socialLabel")}
            </motion.p>

            {/* Social grid */}
            <motion.div
                className="grid grid-cols-2 gap-3"
                variants={cardGrid}
                initial="hidden"
                animate="visible"
            >
                {socials.map((s) => (
                    <motion.a
                        key={s.id}
                        href={s.href}
                        target={s.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        variants={cardItem}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} ${s.span} p-4 flex flex-col justify-between min-h-[120px] group cursor-pointer`}
                    >
                        {/* Subtle noise overlay */}
                        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />

                        {/* Icon — top right */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-white/50 transition-colors duration-300">
                            {s.icon}
                        </div>

                        {/* Text */}
                        <div className="relative z-10 flex flex-col gap-1 max-w-[70%]">
                            <p className="text-sm font-semibold text-white leading-tight">{t(s.labelKey)}</p>
                            <p className="text-[11px] text-white/70 leading-snug">{t(s.descKey)}</p>
                        </div>

                        {/* Button */}
                        <div className="relative z-10 mt-3">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm transition-all duration-200 group-hover:bg-white/20">
                                {t(s.btnKey)}
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 7h10v10M7 17 17 7" />
                                </svg>
                            </span>
                        </div>
                    </motion.a>
                ))}
            </motion.div>

            {/* Divider */}
            <motion.div variants={pageItem} className="my-8 border-t border-dashed border-border" />

            {/* Message form */}
            <motion.div variants={pageItem}>
                <p className="mb-4 text-sm font-medium text-foreground">{t("messageLabel")}</p>

                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            name="name"
                            type="text"
                            placeholder={t("name")}
                            value={form.name}
                            onChange={handleChange}
                            className="rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder={t("email")}
                            value={form.email}
                            onChange={handleChange}
                            className="rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder={t("message")}
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        className="rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                    />

                    <motion.button
                        onClick={handleSend}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl border border-border bg-muted py-2.5 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
                    >
                        {sent ? t("sent") : t("send")}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}