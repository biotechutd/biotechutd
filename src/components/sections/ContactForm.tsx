"use client";

import { useState, type FormEvent } from "react";
import { NotebookCard } from "@/components/notebook/NotebookCard";
import { Taped } from "@/components/notebook/Taped";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setErrorMessage(getErrorMessage(result));
      setFormState("error");
      return;
    }

    event.currentTarget.reset();
    setFormState("success");
  }

  return (
    <Taped tapes={[{ position: "top-left", rotate: -8, width: 82 }, { position: "top-right", rotate: 9, width: 82 }]}>
      <NotebookCard variant="dashed" className="px-6 py-8 sm:px-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-black uppercase text-accent">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={120}
              className="mt-2 min-h-11 w-full border-2 border-ink bg-white px-3 py-2 text-base font-semibold shadow-[3px_3px_0_var(--color-paper-shadow)] outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-black uppercase text-accent">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={160}
              className="mt-2 min-h-11 w-full border-2 border-ink bg-white px-3 py-2 text-base font-semibold shadow-[3px_3px_0_var(--color-paper-shadow)] outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-black uppercase text-accent">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={7}
              maxLength={4000}
              className="mt-2 w-full resize-y border-2 border-ink bg-white px-3 py-2 text-base font-semibold shadow-[3px_3px_0_var(--color-paper-shadow)] outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" className="-rotate-1" disabled={formState === "sending"}>
              {formState === "sending" ? "Sending..." : "Send Message"}
            </Button>
            {formState === "success" && <p className="font-bold text-accent">Message sent.</p>}
            {formState === "error" && <p className="font-bold text-club-coral">{errorMessage}</p>}
          </div>
        </form>
      </NotebookCard>
    </Taped>
  );
}

function getErrorMessage(result: unknown) {
  if (result && typeof result === "object" && "error" in result && typeof result.error === "string") {
    return result.error;
  }

  return "Something went wrong. Please try again.";
}
