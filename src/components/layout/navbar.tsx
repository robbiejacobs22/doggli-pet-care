"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full px-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5",
            scrolled
              ? "border border-line/80 bg-cream/85 py-2 shadow-soft backdrop-blur-md"
              : "border border-transparent py-2",
          )}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight text-forest-ink"
            aria-label={`${site.name} — home`}
          >
            {site.shortName}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-stone transition-colors hover:bg-sand hover:text-forest-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <a href={telHref} aria-label={`Call ${site.phone}`}>
                <Phone className="size-4" />
                {site.phone}
              </a>
            </Button>
            <Button asChild variant="honey" size="sm">
              <Link href="/#book">Book a Stay</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-forest-ink transition-colors hover:bg-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 overflow-hidden rounded-3xl border border-line bg-cream/95 p-3 shadow-lift backdrop-blur-md lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-sand"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-2 p-1">
              <Button asChild variant="outline" size="md">
                <a href={telHref}>
                  <Phone className="size-4" /> Call
                </a>
              </Button>
              <Button asChild variant="honey" size="md">
                <Link href="/#book" onClick={() => setOpen(false)}>
                  Book a Stay
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
