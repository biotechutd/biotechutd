import { NotebookPage } from "@/components/notebook/NotebookPage";
import { EventsLayout } from "@/components/sections/EventsLayout";
import { getEventsContent } from "@/lib/content/getEventsContent";

export default async function EventsPage() {
  const content = await getEventsContent();

  return (
    <NotebookPage>
      <EventsLayout events={content.upcoming} />
    </NotebookPage>
  );
}
