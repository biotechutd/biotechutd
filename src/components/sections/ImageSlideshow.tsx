"use client";

import { useEffect, useState } from "react";
import { NotebookImage } from "@/components/notebook/NotebookImage";
import { buttonClassName } from "@/components/ui/Button";

type Slide = {
  src: string;
  alt: string;
  title?: string;
};

type ImageSlideshowProps = {
  slides: Slide[];
  autoAdvance?: boolean;
  autoAdvanceIntervalMs?: number;
};

export function ImageSlideshow({ slides, autoAdvance = true, autoAdvanceIntervalMs = 8000 }: ImageSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!autoAdvance || !hasMultipleSlides) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index === slides.length - 1 ? 0 : index + 1));
    }, autoAdvanceIntervalMs);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, autoAdvance, autoAdvanceIntervalMs, hasMultipleSlides, slides.length]);

  if (!activeSlide) {
    return null;
  }

  const showPrevious = () => {
    if (!hasMultipleSlides) {
      return;
    }

    setActiveIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
  };

  const showNext = () => {
    if (!hasMultipleSlides) {
      return;
    }

    setActiveIndex((index) => (index === slides.length - 1 ? 0 : index + 1));
  };

  const disabledButtonClassName = "opacity-45 shadow-none grayscale hover:translate-y-0 hover:bg-accent hover:shadow-none";

  return (
    <section className="space-y-4">
      <NotebookImage src={activeSlide.src} alt={activeSlide.alt} withTape rotate={1.5} aspectRatio="16 / 10" />
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Previous slide"
          className={`${buttonClassName} -rotate-1 ${!hasMultipleSlides ? disabledButtonClassName : ""}`}
          disabled={!hasMultipleSlides}
          onClick={showPrevious}
        >
          Prev
        </button>
        <p className="text-center text-sm font-bold text-ink/70">{activeSlide.title ?? `${activeIndex + 1} / ${slides.length}`}</p>
        <button
          type="button"
          aria-label="Next slide"
          className={`${buttonClassName} rotate-1 ${!hasMultipleSlides ? disabledButtonClassName : ""}`}
          disabled={!hasMultipleSlides}
          onClick={showNext}
        >
          Next
        </button>
      </div>
    </section>
  );
}
