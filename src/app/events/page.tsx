import { NotebookPage } from "@/components/notebook/NotebookPage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function EventsPage() {
  return (
    <NotebookPage>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Notebook" title="Events" />
        <p className="mt-4 text-ink/75">Event notes and gallery previews will be built here.</p>
      </main>
    </NotebookPage>
  );
}
