"use client";
import { useState } from "react";
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
        label: "Stay in Touch",
        desc: "Reach out via email for inquiries or collaborations.",
        btn: "Go to Gmail",
        href: "mailto:your@gmail.com",
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
        label: "Follow My Journey",
        desc: "Follow my creative journey.",
        btn: "Go to Instagram",
        href: "https://instagram.com/yourhandle",
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
        label: "Join the Fun",
        desc: "Watch engaging and fun content.",
        btn: "Go to Tiktok",
        href: "https://tiktok.com/@yourhandle",
        span: "col-span-1",
        gradient: "from-neutral-700 via-neutral-600 to-neutral-500",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-90">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
            </svg>
        ),
    },
    {
        id: "github",
        label: "Explore the Code",
        desc: "Explore my open-source work.",
        btn: "Go to Github",
        href: "https://github.com/yourusername",
        span: "col-span-1",
        gradient: "from-slate-800 via-slate-700 to-slate-600",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-90">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSend = () => {
        if (!form.name || !form.email || !form.message) return;
        const subject = encodeURIComponent(`Message from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.open(`mailto:your@gmail.com?subject=${subject}&body=${body}`);
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
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Contact</h1>
                <p className="mt-1 text-sm text-muted-foreground">Let&apos;s get in touch.</p>
            </motion.div>

            <motion.div variants={pageItem} className="my-6 border-t border-dashed border-border" />

            {/* Social label */}
            <motion.p variants={pageItem} className="mb-4 text-sm font-medium text-foreground">
                Find me on social media
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
                            <p className="text-sm font-semibold text-white leading-tight">{s.label}</p>
                            <p className="text-[11px] text-white/70 leading-snug">{s.desc}</p>
                        </div>

                        {/* Button */}
                        <div className="relative z-10 mt-3">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm transition-all duration-200 group-hover:bg-white/20">
                                {s.btn}
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
                <p className="mb-4 text-sm font-medium text-foreground">Or send me a message</p>

                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            className="rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder="Message"
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
                        {sent ? "✓ Sent!" : "Send Email"}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}