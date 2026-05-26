import { NotebookPage } from "@/components/notebook/NotebookPage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ContactPage() {
  return (
    <NotebookPage>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Send us a note" />
        <p className="mt-4 text-ink/75">The Cloudflare Pages Function contact form will live here.</p>
      </main>
    </NotebookPage>
  );
}
