import { NotebookPage } from "@/components/notebook/NotebookPage";
import { OfficersShowcase } from "@/components/sections/OfficersShowcase";
import { getOfficers } from "@/lib/content/getOfficers";

export default async function OfficersPage() {
  const officers = await getOfficers();

  return (
    <NotebookPage>
      <main>
        <OfficersShowcase officers={officers} />
      </main>
    </NotebookPage>
  );
}
