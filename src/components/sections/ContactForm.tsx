"use client";

import Image from "next/image";
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
    const form = event.currentTarget;

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    try {
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

      form.reset();
      setFormState("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  return (
    <>
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
              {formState === "error" && <p className="font-bold text-club-coral">{errorMessage}</p>}
            </div>
          </form>
        </NotebookCard>
      </Taped>

      {formState === "success" && <ContactSuccessModal onClose={() => setFormState("idle")} />}
    </>
  );
}

function ContactSuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-success-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-lg border-2 border-ink bg-paper px-6 py-7 text-center shadow-[8px_8px_0_var(--color-paper-shadow)]"
      >
        <button
          type="button"
          aria-label="Close message sent popup"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-accent text-xl font-black leading-none text-white shadow-[3px_3px_0_var(--color-paper-shadow)] transition hover:-translate-y-0.5 hover:bg-accent-deep"
          onClick={onClose}
        >
          x
        </button>
        <div className="mx-auto mb-5 flex size-32 items-center justify-center rounded-md bg-white shadow-inner">
          <Image
            src="/images/contact/message-sent.svg"
            alt=""
            width={112}
            height={112}
            className="h-28 w-28"
          />
        </div>
        <h2 id="contact-success-title" className="text-2xl font-black">
          Message sent!
        </h2>
        <p className="mt-2 leading-7 text-ink/75">Thanks for reaching out. We got your note.</p>
        <Button type="button" className="mt-5 rotate-1" onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
}

function getErrorMessage(result: unknown) {
  if (result && typeof result === "object" && "error" in result && typeof result.error === "string") {
    return result.error;
  }

  return "Something went wrong. Please try again.";
}
