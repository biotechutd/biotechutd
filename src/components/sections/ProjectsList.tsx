import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import type { CommitteeContent } from "@/lib/content/schemas";

type ProjectsListProps = {
  projects: CommitteeContent["projects"];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-20">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase text-accent">Projects</p>
        <h2 className="mt-2 text-4xl font-black leading-tight">Spring &apos;26 Projects</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Taped
            key={`${project.companyName ?? "company"}-${project.projectName ?? index}`}
            rotate={index % 2 === 0 ? -1 : 1}
            tapes={[{ position: "top-center", rotate: index % 2 === 0 ? -8 : 8, width: 76 }]}
          >
            <NotebookCard className="min-h-56">
              {project.companyName && <p className="mb-5 text-sm font-black uppercase text-accent">{project.companyName}</p>}
              {project.projectName && <h3 className="text-2xl font-black leading-tight">{project.projectName}</h3>}
              {project.description && <p className="mt-3 leading-7 text-ink/75">{project.description}</p>}
            </NotebookCard>
          </Taped>
        ))}
      </div>
    </section>
  );
}
