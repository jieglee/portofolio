"use client";
import { useTranslations } from "next-intl";

const careerList = [
    {
        title: "Treasurer of Student Council (OSIS)",
        organization: "SMK Taruna Bhakti",
        period: "2024 – 2025",
        descriptionKey: "treasurerDesc",
    },
];

export default function Career() {
    const t = useTranslations("About");
    return (
        <section>
            <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t("career")}
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-4">
                {careerList.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-border bg-card p-5"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                            <div>
                                <h3 className="text-base font-semibold text-foreground">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.organization}
                                </p>
                            </div>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                {item.period}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {t(item.descriptionKey)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
