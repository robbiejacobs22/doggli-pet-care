import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { Stars } from "@/components/stars";
import { BookingForm } from "@/components/booking/booking-form";
import { ContactDialog } from "@/components/booking/contact-dialog";
import { Button } from "@/components/ui/button";
import { site, telHref, mailtoHref, directionsHref } from "@/lib/site";

export function Booking() {
  return (
    <Section id="book" className="scroll-mt-24 bg-cream" innerClassName="">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Left: reassurance + contact */}
        <Reveal>
          <span className="eyebrow">Book a stay</span>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Let&apos;s plan your dog&apos;s{" "}
            <em
              className="not-italic text-clay"
              style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1' }}
            >
              best day
            </em>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-stone">
            Tell us a little about your pup and we&apos;ll get right back to you —
            usually within a few hours. Every new dog starts with a free, no-pressure
            meet &amp; greet.
          </p>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-line bg-card p-4 shadow-soft">
            <Stars rating={site.rating.value} size={18} />
            <p className="text-sm text-stone">
              <span className="font-semibold text-forest-ink">{site.rating.value.toFixed(1)}/5</span>{" "}
              from {site.rating.count}+ local pet parents
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            <li>
              <a href={telHref} className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sand">
                <span className="grid size-11 place-items-center rounded-xl bg-honey-soft text-honey-deep">
                  <Phone className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-stone">Call or text</span>
                  <span className="font-medium text-forest-ink group-hover:text-forest">{site.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={mailtoHref} className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sand">
                <span className="grid size-11 place-items-center rounded-xl bg-honey-soft text-honey-deep">
                  <Mail className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-stone">Email</span>
                  <span className="font-medium text-forest-ink group-hover:text-forest">{site.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sand">
                <span className="grid size-11 place-items-center rounded-xl bg-honey-soft text-honey-deep">
                  <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-stone">Visit us</span>
                  <span className="font-medium text-forest-ink group-hover:text-forest">{site.address.full}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-2xl p-2">
              <span className="grid size-11 place-items-center rounded-xl bg-honey-soft text-honey-deep">
                <Clock className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-stone">Hours</span>
                <span className="font-medium text-forest-ink">{site.hours}</span>
              </span>
            </li>
          </ul>

          <div className="mt-6">
            <ContactDialog>
              <Button variant="outline" size="md">
                <MessageSquare className="size-4" />
                Just send a quick message
              </Button>
            </ContactDialog>
          </div>
        </Reveal>

        {/* Right: multi-step form */}
        <Reveal direction="left">
          <BookingForm />
        </Reveal>
      </div>
    </Section>
  );
}
