import { NotebookPage } from "@/components/notebook/NotebookPage";
import { OfficerGrid } from "@/components/sections/OfficerGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getOfficers } from "@/lib/content/getOfficers";

export default async function OfficersPage() {
  const officers = await getOfficers();

  return (
    <NotebookPage>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="People" title="Officers" />
        <OfficerGrid officers={officers} />
      </main>
    </NotebookPage>
  );
}
