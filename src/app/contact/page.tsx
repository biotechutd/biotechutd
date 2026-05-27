import { NotebookPage } from "@/components/notebook/NotebookPage";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ContactPage() {
  return (
    <NotebookPage>
      <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:px-20">
        <div className="w-full text-center">
          <SectionHeading eyebrow="Contact" title="Send us a note!" />
        </div>
        <div className="w-full max-w-2xl">
          <ContactForm />
        </div>
      </main>
    </NotebookPage>
  );
}
