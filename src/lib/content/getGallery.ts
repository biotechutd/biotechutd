import { promises as fs } from "node:fs";
import path from "node:path";
import { gallerySchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export type GallerySlide = {
  src: string;
  alt: string;
  title?: string;
};

export type GalleryContent = {
  slides: GallerySlide[];
  autoAdvance: boolean;
};

const fallbackSlides: GallerySlide[] = [
  {
    src: "/images/gallery/notebook-sample.svg",
    alt: "Notebook-style placeholder for future Biotech UTD event photos.",
    title: "Gallery placeholder"
  },
  {
    src: "/images/gallery/notebook-sample-alt.svg",
    alt: "Notebook-style placeholder for future club workshop photos.",
    title: "Workshop placeholder"
  }
];
const fallbackGallery: GalleryContent = {
  slides: fallbackSlides,
  autoAdvance: true
};

const publicDirectory = path.join(process.cwd(), "public");

async function publicFileExists(src: string) {
  if (!src.startsWith("/")) {
    return true;
  }

  const publicPath = path.normalize(path.join(publicDirectory, src));

  if (!publicPath.startsWith(publicDirectory)) {
    return false;
  }

  try {
    const stat = await fs.stat(publicPath);
    return stat.isFile();
  } catch {
    return false;
  }
}

function isSafeGalleryName(name: string) {
  return /^[a-z0-9-]+$/.test(name);
}

function isSafeImageName(name: string) {
  return !path.isAbsolute(name) && !name.includes("..") && !name.includes("/") && !name.includes("\\");
}

export async function getGallery(name?: string): Promise<GalleryContent> {
  if (!name || !isSafeGalleryName(name)) {
    return fallbackGallery;
  }

  try {
    const gallery = await readYamlFile(`gallery/${name}.yaml`, gallerySchema);
    const slides = await Promise.all(
      gallery.images
        .filter((image) => isSafeImageName(image.name))
        .map(async (image) => {
          const src = `/images/gallery/${name}/${image.name}`;

          if (!(await publicFileExists(src))) {
            return null;
          }

          const slide: GallerySlide = {
            src,
            alt: image.alt
          };

          if (image.title) {
            slide.title = image.title;
          }

          return slide;
        })
    );
    const existingSlides = slides.filter((slide): slide is GallerySlide => Boolean(slide));

    return {
      slides: existingSlides.length > 0 ? existingSlides : fallbackSlides,
      autoAdvance: gallery.autoAdvance
    };
  } catch {
    return fallbackGallery;
  }
}
