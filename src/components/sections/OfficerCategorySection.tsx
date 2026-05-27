import { HeadshotCard, type HeadshotCardLink } from "@/components/officers/HeadshotCard";
import type { Officer } from "@/lib/content/schemas";

type OfficerCategorySectionProps = {
  title: string;
  officers: Officer[];
  featuredLayout?: boolean;
};

function getOfficerLinks(officer: Officer): HeadshotCardLink[] {
  return [
    officer.github && { href: officer.github, label: "GitHub", icon: "fa-github" as const },
    officer.linkedin && { href: officer.linkedin, label: "LinkedIn", icon: "fa-linkedin" as const },
    officer.email && { href: `mailto:${officer.email}`, label: "Email", icon: "fa-envelope" as const }
  ].filter(Boolean) as HeadshotCardLink[];
}

export function OfficerCategorySection({ title, officers, featuredLayout = false }: OfficerCategorySectionProps) {
  const featuredOfficers = featuredLayout ? officers.filter((officer) => officer.featured) : [];
  const regularOfficers = featuredLayout ? officers.filter((officer) => !officer.featured) : officers;

  if (officers.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase text-accent">Officers</p>
        <h2 className="mt-2 text-4xl font-black leading-tight">{title}</h2>
      </div>

      {featuredOfficers.length > 0 && (
        <div className="mx-auto flex max-w-[32rem] flex-wrap justify-center gap-x-8 gap-y-10">
          {featuredOfficers.map((officer, index) => (
            <div key={officer.slug} className="w-48">
              <HeadshotCard
                name={officer.name}
                role={officer.role}
                image={officer.image}
                links={getOfficerLinks(officer)}
                rotate={index % 2 === 0 ? -1 : 1}
              />
            </div>
          ))}
        </div>
      )}

      {regularOfficers.length > 0 && (
        <div className="mx-auto flex max-w-[56rem] flex-wrap justify-center gap-x-8 gap-y-10">
          {regularOfficers.map((officer, index) => (
            <div key={officer.slug} className="w-48">
              <HeadshotCard
                name={officer.name}
                role={officer.role}
                image={officer.image}
                links={getOfficerLinks(officer)}
                rotate={index % 2 === 0 ? -1 : 1}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
