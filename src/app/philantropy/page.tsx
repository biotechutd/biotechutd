import { NotebookPage } from "@/components/notebook/NotebookPage";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { getCommitteeContent } from "@/lib/content/getCommitteeContent";

const gallerySlides = [
  {
    src: "/images/gallery/notebook-sample.svg",
    alt: "Notebook-style placeholder for future Philantropy event photos.",
    title: "Philantropy gallery placeholder"
  },
  {
    src: "/images/gallery/notebook-sample-alt.svg",
    alt: "Notebook-style placeholder for future volunteer event photos.",
    title: "Volunteer event placeholder"
  }
];

export default async function PhilantropyPage() {
  const content = await getCommitteeContent("philantropy");

  return (
    <NotebookPage theme="philantropy">
      <CommitteeHero content={content} rotate={-1} />
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-20">
        <ImageSlideshow slides={gallerySlides} />
      </section>
    </NotebookPage>
  );
}
