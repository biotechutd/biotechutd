import { NotebookPage } from "@/components/notebook/NotebookPage";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { getCommitteeContent } from "@/lib/content/getCommitteeContent";

const gallerySlides = [
  {
    src: "/images/gallery/notebook-sample.svg",
    alt: "Notebook-style placeholder for future MiniMissions project photos.",
    title: "MiniMissions gallery placeholder"
  },
  {
    src: "/images/gallery/notebook-sample-alt.svg",
    alt: "Notebook-style placeholder for future student build photos.",
    title: "Student build placeholder"
  }
];

export default async function MiniMissionsPage() {
  const content = await getCommitteeContent("minimissions");

  return (
    <NotebookPage theme="minimissions">
      <CommitteeHero content={content} rotate={1} />
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-20">
        <ImageSlideshow slides={gallerySlides} />
      </section>
    </NotebookPage>
  );
}
