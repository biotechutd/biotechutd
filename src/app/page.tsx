import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { NotebookPage } from "@/components/notebook/NotebookPage";
import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { NewsletterEmbed } from "@/components/sections/NewsletterEmbed";
import { Button } from "@/components/ui/Button";
import { getBanner } from "@/lib/content/getBanner";
import { getGallery } from "@/lib/content/getGallery";
import { getHomePageContent } from "@/lib/content/getHomePageContent";

export default async function HomePage() {
  const [banner, gallery, content] = await Promise.all([getBanner(), getGallery("home"), getHomePageContent()]);

  return (
    <NotebookPage>
      <AnnouncementBanner banner={banner} />
      <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(30rem,1.2fr)] lg:px-20">
        <Taped
          rotate={-1}
          tapes={[
            { position: "top-left", rotate: -9, width: 86, offsetX: 8 },
            { position: "top-right", rotate: 8, width: 86, offsetX: -8 }
          ]}
        >
          <NotebookCard variant="dashed" className="px-6 py-8 sm:px-7 md:py-10">
            <h1 className="text-3xl font-bold leading-none text-black sm:text-4xl">{content.hero.title}</h1>
            <p className="mt-5 max-w-3xl text-base font-normal leading-7 text-ink/80 sm:text-lg">
              {content.hero.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {content.hero.links.map((link, index) => (
                <Button key={link.href} href={link.href} className={index % 2 === 0 ? "-rotate-1" : "rotate-1"}>
                  {link.label}
                </Button>
              ))}
            </div>
          </NotebookCard>
        </Taped>

        <div>
          <ImageSlideshow slides={gallery.slides} autoAdvance={gallery.autoAdvance} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-20">
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {content.programCards.map((card, index) => (
            <Taped
              key={card.title}
              rotate={index - 1}
              className="h-full"
              tapes={[{ position: "top-center", rotate: index % 2 === 0 ? -8 : 7, width: 68 }]}
            >
              <NotebookCard className="flex h-full min-h-72 flex-col">
                <h2 className="text-2xl font-black">{card.title}</h2>
                <p className="mt-3 min-h-24 grow leading-7 text-ink/75">{card.body}</p>
                {card.cta && (
                  <Button href={card.cta.href} className="mt-auto w-fit -rotate-1">
                    {card.cta.label}
                  </Button>
                )}
              </NotebookCard>
            </Taped>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-20">
        <NotebookCard as="section" variant="dashed" rotate={-1} className="self-start">
          <h2 className="text-3xl font-black">{content.join.title}</h2>
          <p className="mt-3 leading-7 text-ink/75">{content.join.body}</p>
        </NotebookCard>
        <NewsletterEmbed title={content.newsletter.title} src={content.newsletter.src} className="mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-none" />
      </section>
    </NotebookPage>
  );
}
