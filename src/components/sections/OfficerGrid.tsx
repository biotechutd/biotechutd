import { PaperCard } from "@/components/notebook/PaperCard";
import { PinnedPhoto } from "@/components/notebook/PinnedPhoto";
import type { Officer } from "@/lib/content/schemas";

type OfficerGridProps = {
  officers: Officer[];
};

export function OfficerGrid({ officers }: OfficerGridProps) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {officers.map((officer) => (
        <PaperCard key={officer.slug} className="flex flex-col gap-4">
          <PinnedPhoto src={officer.image} alt={officer.name} />
          <div>
            <h2 className="text-xl font-bold">{officer.name}</h2>
            <p className="font-semibold text-club-green">{officer.role}</p>
            <p className="mt-2 text-sm leading-6 text-ink/75">{officer.bio}</p>
          </div>
        </PaperCard>
      ))}
    </div>
  );
}
