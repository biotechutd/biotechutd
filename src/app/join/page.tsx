import { NotebookPage } from "@/components/notebook/NotebookPage";
import { ApplicationGrid } from "@/components/sections/ApplicationGrid";
import { getApplications } from "@/lib/content/getApplications";

export default async function JoinPage() {
  const applications = await getApplications();

  return (
    <NotebookPage>
      <main>
        <ApplicationGrid applications={applications.cards} />
      </main>
    </NotebookPage>
  );
}
