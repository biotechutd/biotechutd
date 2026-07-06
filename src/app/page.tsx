import { NotebookPage } from "@/components/notebook/NotebookPage";
import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { NewsletterEmbed } from "@/components/sections/NewsletterEmbed";
import { Button } from "@/components/ui/Button";

const programCards = [
  {
    title: "Workshops",
    body: "Explore some of the workshops we offer and look out for upcoming learning opportunities!"
  },
  {
    title: "Projects",
    body: "They’re a great way to build your CS and engineering skills through workshops and an 8-week guided project."
  },
  {
    title: "MiniMissions",
    body: "TODO"
  }
];

const gallerySlides = [
  {
    src: "/images/gallery/notebook-sample.svg",
    alt: "Notebook-style placeholder for future Biotech UTD event photos.",
    title: "Gallery placeholder"
  },
  {
    src: "/images/gallery/notebook-sample-alt.svg",
    alt: "Notebook-style placeholder for future club workshop photos.",
    title: "Workshop placeholder"
  }
];

export default function HomePage() {
  return (
    <NotebookPage>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_26rem] lg:px-20">
        <Taped
          rotate={1}
          tapes={[
            { position: "top-left", rotate: -9, width: 86, offsetX: 8 },
            { position: "top-right", rotate: 8, width: 86, offsetX: -8 }
          ]}
        >
          <NotebookCard variant="dashed" className="px-6 py-10 sm:px-8 md:py-14">
            <h1 className=" font-black leading-none text-black text-4xl">THE BIOTECH CLUB</h1>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-8 text-black sm:text-2xl">
              Bridging biomedical engineering, computer science, and healthcare innovation. Join us to build, research,
              and solve real-world problems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/events" className="-rotate-1">
                See Events
              </Button>
              <Button href="/contact" className="rotate-1">
                Join Us
              </Button>
            </div>
          </NotebookCard>
        </Taped>

        <div className="hidden lg:block">
          <NewsletterEmbed
            title="Biotech Newsletter"
            src="https://www.canva.com/design/DAG50nSTQJ0/9Kv5bx62Z17eW94pRf8m7w/view?embed"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-20">
        <div className="grid gap-5 md:grid-cols-3">
          {programCards.map((card, index) => (
            <Taped key={card.title} rotate={index - 1} tapes={[{ position: "top-center", rotate: index % 2 === 0 ? -8 : 7, width: 68 }]}>
              <NotebookCard className="h-full">
                <h2 className="text-2xl font-black">{card.title}</h2>
                <p className="mt-3 leading-7 text-ink/75">{card.body}</p>
                <Button href="/events" className="mt-5 -rotate-1">
                  Learn More
                </Button>
              </NotebookCard>
            </Taped>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-20">
        <NotebookCard as="section" variant="dashed" rotate={-1} className="self-start">
          <h2 className="text-3xl font-black">Join our Club</h2>
          <p className="mt-3 leading-7 text-ink/75">
Our semester-long mini internships accept applications at the beginning of each semester. Keep a look out for open positions on our two committees and leadership team.
          </p>
        </NotebookCard>
        <ImageSlideshow slides={gallerySlides} />
      </section>
    </NotebookPage>
  );
}
