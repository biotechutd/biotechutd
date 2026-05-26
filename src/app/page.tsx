import { NotebookPage } from "@/components/notebook/NotebookPage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <NotebookPage>
      <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-center gap-6 px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Biotech UTD" title="A club notebook for curious builders in biotech." />
        <p className="max-w-2xl text-base leading-7 text-ink/80 sm:text-lg">
          This starter page will become the notebook-inspired homepage using the prototype as the visual reference.
        </p>
      </section>
    </NotebookPage>
  );
}
