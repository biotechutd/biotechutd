import { NotebookPage } from "@/components/notebook/NotebookPage";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { getCommitteeContent } from "@/lib/content/getCommitteeContent";
import type { CommitteeContent } from "@/lib/content/schemas";

type LinkButton = NonNullable<CommitteeContent["hero"]["links"]>[number];

function isLinkButton(link: LinkButton | undefined): link is LinkButton {
  return Boolean(link);
}

export default async function ProjectsPage() {
  const content = await getCommitteeContent("projects");
  const descriptionButton = content.hero.projectDescription?.href ? content.hero.projectDescription : undefined;
  const projectButtons = [descriptionButton].filter(isLinkButton);

  return (
    <NotebookPage>
      <CommitteeHero content={{ ...content, hero: { ...content.hero, links: projectButtons } }} rotate={1} />
      <ProjectsList projects={content.projects} />
    </NotebookPage>
  );
}
