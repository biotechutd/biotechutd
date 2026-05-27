import { OfficerCategorySection } from "@/components/sections/OfficerCategorySection";
import type { Officer } from "@/lib/content/schemas";

const categories = [
  { id: "executive", title: "Executive Body", featuredLayout: true },
  { id: "cs-engr", title: "CS/ENGR Committee", featuredLayout: false },
  { id: "industry", title: "Industry", featuredLayout: false },
  { id: "philantropy", title: "Philantropy", featuredLayout: false },
  { id: "marketing", title: "Marketing", featuredLayout: false },
  { id: "founders", title: "Founders", featuredLayout: false }
] as const;

type OfficersShowcaseProps = {
  officers: Officer[];
};

export function OfficersShowcase({ officers }: OfficersShowcaseProps) {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-20">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase text-accent">Officers</p>
        <h1 className="mt-2 text-5xl font-black leading-tight">Meet the Crew</h1>
      </div>

      {categories.map((category) => (
        <OfficerCategorySection
          key={category.id}
          title={category.title}
          officers={officers.filter((officer) => officer.category === category.id)}
          featuredLayout={category.featuredLayout}
        />
      ))}
    </section>
  );
}
