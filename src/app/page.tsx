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
  const [banner, gallerySlides, content] = await Promise.all([getBanner(), getGallery(), getHomePageContent()]);

  return (
    <NotebookPage>
      <AnnouncementBanner banner={banner} />
      <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_26rem] lg:px-20">
        <Taped
          rotate={1}
          tapes={[
            { position: "top-left", rotate: -9, width: 86, offsetX: 8 },
            { position: "top-right", rotate: 8, width: 86, offsetX: -8 }
          ]}
        >
          <NotebookCard variant="dashed" className="px-6 py-10 sm:px-8 md:py-14">
            <h1 className="text-4xl font-black leading-none text-black">{content.hero.title}</h1>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-8 text-black sm:text-2xl">
              {content.hero.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.hero.links.map((link, index) => (
                <Button key={link.href} href={link.href} className={index % 2 === 0 ? "-rotate-1" : "rotate-1"}>
                  {link.label}
                </Button>
              ))}
            </div>
          </NotebookCard>
        </Taped>

        <div className="hidden lg:block">
          <NewsletterEmbed title={content.newsletter.title} src={content.newsletter.src} />
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

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-20">
        <NotebookCard as="section" variant="dashed" rotate={-1} className="self-start">
          <h2 className="text-3xl font-black">{content.join.title}</h2>
          <p className="mt-3 leading-7 text-ink/75">{content.join.body}</p>
        </NotebookCard>
        <ImageSlideshow slides={gallerySlides} />
      </section>
    </NotebookPage>
  );
}
