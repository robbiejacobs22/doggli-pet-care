import { Quote } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Stars } from "@/components/stars";
import { testimonials } from "@/lib/content";
import { site } from "@/lib/site";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.2a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.44-4.96 3.44-8.38Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.1 0 5.7-1.03 7.6-2.78l-3.72-2.89c-1.03.69-2.35 1.1-3.88 1.1-2.98 0-5.5-2.01-6.4-4.72H1.76v2.98A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.71a7.2 7.2 0 0 1 0-4.42V7.31H1.76a12 12 0 0 0 0 10.38l3.84-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.68 0 3.2.58 4.39 1.72l3.29-3.29C17.7 1.2 15.1 0 12 0A12 12 0 0 0 1.76 7.31l3.84 2.98C6.5 6.76 9.02 4.75 12 4.75Z"
      />
    </svg>
  );
}

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="relative overflow-hidden bg-forest text-on-forest"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_15%_10%,oklch(48%_0.075_156/0.55),transparent_60%)]"
      />

      <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        {/* Aggregate */}
        <Reveal className="lg:pr-8">
          <span className="eyebrow text-honey">Real reviews</span>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight text-on-forest sm:text-5xl">
            Pet parents keep coming back
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-display text-6xl font-semibold text-honey">
              {site.rating.value.toFixed(1)}
            </span>
            <div>
              <Stars rating={site.rating.value} size={20} />
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-on-forest-muted">
                <GoogleG className="size-4" />
                {site.rating.count}+ reviews on Google
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm leading-relaxed text-on-forest-muted">
            We&apos;re proud of the trust local families place in us — and we work
            to earn it with every single stay.
          </p>
        </Reveal>

        {/* Cards */}
        <RevealGroup className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <RevealItem
              key={t.id}
              className={i === 0 ? "sm:col-span-2" : undefined}
            >
              <figure className="flex h-full flex-col rounded-3xl bg-card p-6 text-ink shadow-lift">
                <Quote className="size-7 text-honey" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 leading-relaxed text-ink">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-forest font-display text-sm font-semibold text-on-forest">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-forest-ink">{t.name}</p>
                      <p className="text-xs text-stone">Dog parent to {t.dogName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Stars rating={t.rating} size={14} />
                    {t.source === "Google" && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-stone">
                        <GoogleG className="size-3" /> via Google
                      </span>
                    )}
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
