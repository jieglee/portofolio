"use client";
import { useTranslations } from "next-intl";

export default function Resume() {
    const t = useTranslations("About");
    return (
        <section>
            <div className="flex flex-col gap-4">
                <a
                    href="/documents/cv.pdf"
                    download
                    className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {t("downloadCV")}
                </a>

                <div className="w-full rounded-xl border border-border overflow-hidden">
                    <iframe
                        src="/documents/cv.pdf"
                        className="w-full h-[600px] lg:h-[800px]"
                        title={t("cv")}
                    />
                </div>
            </div>
        </section>
    );
}
