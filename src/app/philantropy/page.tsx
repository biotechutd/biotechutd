import { NotebookPage } from "@/components/notebook/NotebookPage";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { getCommitteeContent } from "@/lib/content/getCommitteeContent";
import { getGallery } from "@/lib/content/getGallery";

export default async function PhilantropyPage() {
  const content = await getCommitteeContent("philantropy");
  const gallery = await getGallery("philantropy");

  return (
    <NotebookPage theme="philantropy">
      <CommitteeHero content={content} rotate={-1} />
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-20">
        <ImageSlideshow slides={gallery.slides} autoAdvance={gallery.autoAdvance} />
      </section>
    </NotebookPage>
  );
}
