"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarHeart, Phone } from "lucide-react";
import { site, telHref } from "@/lib/site";

/**
 * Sticky click-to-call + book bar, mobile only. Appears once the user scrolls
 * past the hero so it never covers the first impression.
 */
export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="m-3 grid grid-cols-2 gap-2 rounded-2xl border border-line bg-cream/90 p-2 shadow-lift backdrop-blur-md">
        <a
          href={telHref}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-card font-semibold text-forest-ink transition-colors active:bg-sand"
          aria-label={`Call ${site.phone}`}
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
        <Link
          href="/#book"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-honey font-semibold text-forest-ink shadow-soft transition-colors active:bg-honey-deep"
        >
          <CalendarHeart className="size-5" aria-hidden="true" />
          Book a Stay
        </Link>
      </div>
    </div>
  );
}
