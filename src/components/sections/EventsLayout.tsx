import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import type { EventsContent } from "@/lib/content/schemas";

type EventsLayoutProps = {
  events: EventsContent["upcoming"];
};

const calendarSrc =
  "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&showTitle=0&showTz=0&showCalendars=0&showTabs=0&src=NjI1ZDM3YjZlMjEwMTYwZGRjNWM0ZmMzZjk5NWI5MzU1NmNmODJjNGU1MDVjMzdmNDJlMDAyMTA0ZDc2NjU4ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23b39ddb";

export function EventsLayout({ events }: EventsLayoutProps) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.85fr)] lg:px-20">
      <Taped rotate={-0.5} tapes={[{ position: "top-left", rotate: -8, width: 86 }, { position: "top-right", rotate: 8, width: 86 }]}>
        <NotebookCard variant="dashed" className="p-3 sm:p-4">
          <div className="overflow-hidden bg-white shadow-inner">
            <iframe
              loading="lazy"
              src={calendarSrc}
              title="Biotech UTD Google Calendar"
              className="h-[28rem] w-full border-0 sm:h-[32rem] lg:h-[34rem]"
            />
          </div>
        </NotebookCard>
      </Taped>

      <aside className="space-y-5">
        <div className="text-center lg:text-left">
          <h1 className="mt-2 text-4xl font-black leading-tight">Upcoming Events</h1>
        </div>

        <div className="grid gap-4">
          {events.map((event, index) => (
            <NotebookCard key={`${event.title}-${event.date}`} variant={index % 2 === 0 ? "solid" : "dashed"} rotate={index % 2 === 0 ? 1 : -1} className="p-4">
              <h2 className="text-xl font-black">{event.title}</h2>
              <p className="mt-1 text-sm font-bold text-accent">{event.date}</p>
              <p className="mt-3 text-sm leading-6 text-ink/75">{event.description}</p>
            </NotebookCard>
          ))}
        </div>
      </aside>
    </main>
  );
}
