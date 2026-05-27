"use client";

import { useState } from "react";
import { NotebookImage } from "@/components/notebook/NotebookImage";
import { buttonClassName } from "@/components/ui/Button";

type Slide = {
  src: string;
  alt: string;
  title?: string;
};

type ImageSlideshowProps = {
  slides: Slide[];
};

export function ImageSlideshow({ slides }: ImageSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  if (!activeSlide) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index === slides.length - 1 ? 0 : index + 1));
  };

  return (
    <section className="space-y-4">
      <NotebookImage src={activeSlide.src} alt={activeSlide.alt} withTape rotate={1.5} aspectRatio="16 / 10" />
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Previous slide"
          className={`${buttonClassName} -rotate-1`}
          onClick={showPrevious}
        >
          Prev
        </button>
        <p className="text-center text-sm font-bold text-ink/70">{activeSlide.title ?? `${activeIndex + 1} / ${slides.length}`}</p>
        <button
          type="button"
          aria-label="Next slide"
          className={`${buttonClassName} rotate-1`}
          onClick={showNext}
        >
          Next
        </button>
      </div>
    </section>
  );
}
