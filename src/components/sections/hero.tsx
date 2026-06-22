"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Camera, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/stars";
import { stats } from "@/lib/content";
import { site, telHref } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const imageWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrap,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  // Smooth, GPU-composited fade + rise — no blur filter (the blur caused the
  // flickery "jumpy" repaint on load/refresh).
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease },
    },
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      {/* warm ambient wash — soft, not a blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(60%_70%_at_70%_-5%,var(--color-honey-soft),transparent_60%),radial-gradient(50%_60%_at_5%_10%,var(--color-sand),transparent_55%)]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm font-medium text-stone shadow-soft">
              <Stars rating={site.rating.value} size={15} />
              <span className="text-forest-ink">{site.rating.value.toFixed(1)}</span>
              <span aria-hidden className="text-line-strong">·</span>
              <span>Loved by {stats[0].value}+ local dogs</span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.02] text-forest-ink sm:text-6xl lg:text-7xl"
          >
            Give your dog the{" "}
            <em
              className="not-italic text-clay"
              style={{ fontVariationSettings: '"SOFT" 90, "WONK" 1' }}
            >
              best day
            </em>
            , every day.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-stone"
          >
            Boutique boarding, daycare, walking, and drop-in visits in El Sobrante.
            Warm, supervised, genuinely loving care — with daily photo updates so
            you can relax while you&apos;re away.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="honey" size="lg">
              <Link href="/#book">
                Book a Stay
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={telHref}>
                <Phone className="size-5" />
                {site.phone}
              </a>
            </Button>
          </motion.div>

          {/* trust stats */}
          <motion.dl
            variants={item}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-forest">
                    {"decimals" in s && s.decimals
                      ? s.value.toFixed(s.decimals)
                      : s.value}
                    {s.suffix}
                  </span>
                  <span className="mt-1 block text-sm text-stone">{s.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Photo */}
        <motion.div
          ref={imageWrap}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-sand shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]">
            <motion.div style={{ y: parallax }} className="absolute inset-0 -top-12 bottom-[-3rem]">
              <Image
                src="/dogs/dog-1.png"
                alt="Two happy dogs enjoying a sunny day at Doggli Pet Care"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover motion-safe:animate-kenburns"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/25 via-transparent to-transparent" />
          </div>

          {/* floating: daily updates */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-line bg-card/95 p-3 pr-4 shadow-lift backdrop-blur-sm sm:-left-6"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-honey-soft text-honey-deep">
              <Camera className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="text-sm">
              <span className="block font-semibold text-forest-ink">Daily photo updates</span>
              <span className="text-stone">See your pup&apos;s day</span>
            </span>
          </motion.div>

          {/* floating: supervised */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="absolute -right-2 top-6 flex items-center gap-2 rounded-full border border-line bg-card/95 px-3.5 py-2 shadow-lift backdrop-blur-sm sm:-right-4"
          >
            <ShieldCheck className="size-5 text-forest" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-sm font-medium text-forest-ink">Safe &amp; supervised</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
