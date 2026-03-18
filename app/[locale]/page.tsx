import { getTranslations } from "next-intl/server";
import MarqueeBrandsDemo from "@/common/components/shadcn-space/marquee/marquee-02";

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <div className="px-6 py-10 lg:px-12">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
        {t("greeting")}
      </h1>

      {/* Meta info */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-muted-foreground">•</span>
          {t("location")}
        </span>
        <span>•</span>
        <span>{t("status")}</span>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Bio */}
      <div className="flex max-w-2xl flex-col gap-4 text-foreground/80 leading-relaxed">
        <p>{t("bio1")}</p>
        <p>{t("bio2")}</p>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Skills teaser */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          &lt;/&gt; {t("skillsTitle")}  
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("skillsSubtitle")}
        </p>
        <div className="mt-6">
          <MarqueeBrandsDemo />
        </div>
      </div>
    </div>
  );
}