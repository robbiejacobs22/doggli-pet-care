import Image from "next/image";
import { Camera } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { galleryImages } from "@/lib/content";

export function Gallery() {
  return (
    <Section id="gallery" className="bg-cream">
      <SectionHeading
        eyebrow="Happy Tails Gallery"
        title="A look at the good days"
        emphasis="good days"
        subtitle="Real dogs, real fun. A peek at the wags, naps, and adventures from a typical day at Doggli."
      />

      <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {galleryImages.map((img) => (
          <RevealItem key={img.id} className="group relative">
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-sand shadow-soft">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/70 via-forest-ink/0 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-1.5 p-4 text-on-forest opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                  <Camera className="size-4 text-honey" aria-hidden="true" />
                  {img.caption}
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-6 text-center text-sm text-stone-light">
        {/* OWNER TODO: add more high-res photos of the dogs, facility, and play areas. */}
        More photos coming soon — follow along on Instagram&nbsp;
        <span className="text-forest">@doggli_petcare</span>.
      </p>
    </Section>
  );
}
