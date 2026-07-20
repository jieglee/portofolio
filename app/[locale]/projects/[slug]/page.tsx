import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/common/constants/projects";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import ProjectDetailPage from "@/modules/projects/ProjectDetailPage";

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((p) => ({
      slug: p.slug,
      locale,
    }))
  );
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  let content = `# ${project.title}\n\n${project.description}`;

  try {
    const projectsDir = path.join(process.cwd(), "content", "projects");
    const localeFilePath = path.join(projectsDir, `${slug}.${locale}.md`);
    const defaultFilePath = path.join(projectsDir, `${slug}.md`);

    if (fs.existsSync(localeFilePath)) {
      content = fs.readFileSync(localeFilePath, "utf8");
    } else if (fs.existsSync(defaultFilePath)) {
      content = fs.readFileSync(defaultFilePath, "utf8");
    }
  } catch (error) {
    console.error("Markdown read error:", error);
  }

  return (
    <ProjectDetailPage
      project={project}
      content={content}
    />
  );
}