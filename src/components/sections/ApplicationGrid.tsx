import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

type ApplicationAction = {
  label: string;
  href: string;
};

type ApplicationCard = {
  title: string;
  description: string;
  actions: ApplicationAction[];
  rotate?: number;
};

// Example application card:
// {
//   title: "Projects",
//   description: "Apply to work on semester-long biotech projects.",
//   actions: [
//     { label: "Project Application", href: "https://forms.gle/example" },
//     { label: "Team Interest Form", href: "https://forms.gle/example" }
//   ],
//   rotate: -0.5
// }
const applications: ApplicationCard[] = [
// {
//   title: "Projects",
//   description: "Apply to work on semester-long biotech projects.",
//   actions: [
//     { label: "Project Application", href: "https://forms.gle/example" },
//     { label: "Team Interest Form", href: "https://forms.gle/example" }
//   ],
//   rotate: -0.5
// } 
];

export function ApplicationGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-accent">Join Us</p>
        <h1 className="mt-2 text-5xl font-black leading-tight">Applications and interest forms</h1>
      </div>

      {applications.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((application, index) => (
            <Taped
              key={application.title}
              rotate={application.rotate}
              tapes={[{ position: "top-center", rotate: index % 2 === 0 ? -8 : 8, width: 78 }]}
            >
              <NotebookCard className="flex min-h-64 flex-col">
                <h2 className="text-2xl font-black">{application.title}</h2>
                <p className="mt-3 grow leading-7 text-ink/75">{application.description}</p>
                {application.actions.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {application.actions.map((action, actionIndex) => (
                    <Button key={action.label} href={action.href} className={actionIndex % 2 === 0 ? "-rotate-1" : "rotate-1"}>
                      {action.label}
                    </Button>
                    ))}
                  </div>
                )}
              </NotebookCard>
            </Taped>
          ))}
        </div>
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
          <p className="text-lg text-ink/75">Check back later for applications.</p>
          <div className="relative aspect-[4/3] w-full max-w-xs">
            <Image
              src="/images/applications/applications-placeholder.svg"
              alt="Applications placeholder"
              fill
              sizes="20rem"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
