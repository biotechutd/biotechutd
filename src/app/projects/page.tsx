import { NotebookPage } from "@/components/notebook/NotebookPage";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { getApplications } from "@/lib/content/getApplications";
import { getCommitteeContent } from "@/lib/content/getCommitteeContent";
import type { CommitteeContent } from "@/lib/content/schemas";

export default async function ProjectsPage() {
  const [content, applications] = await Promise.all([getCommitteeContent("projects"), getApplications()]);
  const projectButtons: NonNullable<CommitteeContent["hero"]["links"]> = [
    content.hero.projectDescription,
    applications.project.enabled && applications.project.url
      ? {
          label: "Apply",
          href: applications.project.url
        }
      : undefined
  ].filter((link): link is NonNullable<typeof link> => Boolean(link));

  return (
    <NotebookPage>
      <CommitteeHero content={{ ...content, hero: { ...content.hero, links: projectButtons } }} rotate={1} />
      <ProjectsList projects={content.projects} />
    </NotebookPage>
  );
}
