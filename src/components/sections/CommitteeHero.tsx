import type { CommitteeContent } from "@/lib/content/schemas";
import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import { Button } from "@/components/ui/Button";

type CommitteeHeroProps = {
  content: CommitteeContent;
  rotate?: number;
};

export function CommitteeHero({ content, rotate = 1 }: CommitteeHeroProps) {
  const { hero } = content;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-20">
      <Taped
        rotate={rotate}
        tapes={[
          { position: "top-left", rotate: -10, width: 82 },
          { position: "top-right", rotate: 8, width: 82 }
        ]}
      >
        <NotebookCard variant="dashed" className="px-6 py-10 sm:px-8">
          <p className="text-sm font-bold uppercase text-accent">{hero.eyebrow}</p>
          <h1 className="mt-2 text-5xl font-black leading-tight">{hero.title}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-ink/75">{hero.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {hero.cta && (
              <Button href={hero.cta.href} className="-rotate-1">
                {hero.cta.label}
              </Button>
            )}
            {hero.links.map((link, index) => (
              <Button key={link.href} href={link.href} className={index % 2 === 0 ? "rotate-1" : "-rotate-1"}>
                {link.label}
              </Button>
            ))}
          </div>
        </NotebookCard>
      </Taped>
    </main>
  );
}
