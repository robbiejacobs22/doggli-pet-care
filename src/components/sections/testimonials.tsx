"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { Stars } from "@/components/stars";
import { testimonials, reviewPhotos } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.2a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.44-4.96 3.44-8.38Z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1.03 7.6-2.78l-3.72-2.89c-1.03.69-2.35 1.1-3.88 1.1-2.98 0-5.5-2.01-6.4-4.72H1.76v2.98A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.6 14.71a7.2 7.2 0 0 1 0-4.42V7.31H1.76a12 12 0 0 0 0 10.38l3.84-2.98Z" />
      <path fill="#EA4335" d="M12 4.75c1.68 0 3.2.58 4.39 1.72l3.29-3.29C17.7 1.2 15.1 0 12 0A12 12 0 0 0 1.76 7.31l3.84 2.98C6.5 6.76 9.02 4.75 12 4.75Z" />
    </svg>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const active = testimonials[index];

  // Auto-advance the spotlight (paused on hover / focus, off for reduced motion).
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <Section
      id="testimonials"
      className="relative overflow-hidden bg-forest text-on-forest"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_15%_0%,oklch(48%_0.075_156/0.55),transparent_60%)]"
      />

      <div className="relative">
        {/* Aggregate header */}
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="eyebrow text-honey">Real Google reviews</span>
          <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight text-on-forest sm:text-5xl">
            Loved by local pet parents
          </h2>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-on-forest/15 bg-on-forest/5 px-4 py-2">
            <span className="font-display text-3xl font-semibold text-honey">
              {site.rating.value.toFixed(1)}
            </span>
            <span className="text-left">
              <Stars rating={5} size={16} />
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-on-forest-muted">
                <GoogleG className="size-3.5" />
                {site.rating.count} reviews on Google
              </span>
            </span>
          </div>
        </Reveal>

        {/* Spotlight */}
        <div
          className="relative mx-auto mt-10 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative min-h-[24rem] overflow-hidden rounded-3xl bg-card shadow-lift sm:min-h-[20rem]">
            <Quote
              className="absolute left-7 top-7 size-9 text-honey/40 sm:left-9 sm:top-8"
              aria-hidden="true"
            />
            <AnimatePresence initial={false} mode="wait">
              <motion.figure
                key={active.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col justify-center p-7 pt-16 text-ink sm:p-10 sm:pt-16"
              >
                <Stars rating={active.rating} size={18} />
                <blockquote className="mt-4 font-display text-lg leading-relaxed text-forest-ink sm:text-2xl sm:leading-relaxed">
                  &ldquo;{active.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-forest font-display text-base font-semibold text-on-forest">
                    {active.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-forest-ink">{active.name}</span>
                    <span className="flex items-center gap-1.5 text-sm text-stone">
                      {active.when}
                      <span aria-hidden>·</span>
                      <GoogleG className="size-3.5" /> via Google
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid size-10 place-items-center rounded-full border border-on-forest/20 text-on-forest transition-colors hover:border-honey/50 hover:bg-honey/10 hover:text-honey"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choose a review">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Review ${i + 1} of ${count}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-honey" : "w-2 bg-on-forest/30 hover:bg-on-forest/60",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid size-10 place-items-center rounded-full border border-on-forest/20 text-on-forest transition-colors hover:border-honey/50 hover:bg-honey/10 hover:text-honey"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Photo marquee — real review photos drifting by */}
      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max gap-4 pr-4 animate-marquee hover:[animation-play-state:paused]">
          {[...reviewPhotos, ...reviewPhotos].map((p, i) => (
            <div
              key={i}
              className="relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-on-forest/10 bg-forest-deep sm:h-52 sm:w-72"
            >
              <Image
                src={p.src}
                alt={i < reviewPhotos.length ? p.alt : ""}
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
