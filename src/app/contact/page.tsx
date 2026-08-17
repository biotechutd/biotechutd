import { NotebookPage } from "@/components/notebook/NotebookPage";
import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getContactContent } from "@/lib/content/getContactContent";

export default async function ContactPage() {
  const content = await getContactContent();

  return (
    <NotebookPage>
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:px-20">
        <div className="w-full text-center">
          <SectionHeading eyebrow={content.heading.eyebrow} title={content.heading.title} />
        </div>
        <div className="grid w-full items-start gap-7 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,0.85fr)]">
          <ContactForm />
          {content.discord.enabled && (
            <Taped rotate={1} className="lg:mt-10" tapes={[{ position: "top-center", rotate: 7, width: 68 }]}>
              <NotebookCard className="px-5 py-6">
                <p className="text-sm font-bold uppercase text-accent">Community</p>
                <h2 className="mt-2 text-2xl font-bold leading-tight">{content.discord.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/75">{content.discord.body}</p>
                <Button href={content.discord.href} className="mt-5 w-fit rotate-1" target="_blank" rel="noopener noreferrer">
                  {content.discord.label}
                </Button>
              </NotebookCard>
            </Taped>
          )}
        </div>
      </main>
    </NotebookPage>
  );
}
