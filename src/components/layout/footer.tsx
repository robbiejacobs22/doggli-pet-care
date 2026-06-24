import Link from "next/link";
import Image from "next/image";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, services } from "@/lib/content";
import { site, telHref, mailtoHref, directionsHref } from "@/lib/site";

/** Nextdoor's house mark, drawn to sit at the same weight as the lucide icons. */
function NextdoorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3a1.6 1.6 0 0 1 1 .36l7.4 5.9c.38.3.6.76.6 1.25V19.5a1.5 1.5 0 0 1-1.5 1.5H14.1v-5.6a2.1 2.1 0 0 0-4.2 0V21H4.5A1.5 1.5 0 0 1 3 19.5v-8.99c0-.49.22-.95.6-1.25l7.4-5.9A1.6 1.6 0 0 1 12 3Z"
      />
    </svg>
  );
}

const socialLinks = [
  { icon: Instagram, href: site.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: site.socials.facebook, label: "Facebook" },
  { icon: NextdoorIcon, href: site.socials.nextdoor, label: "Nextdoor" },
];

export function Footer() {
  return (
    <footer className="relative bg-forest-deep text-on-forest-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        {/* Large brand banner */}
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="group mx-auto block w-full max-w-2xl overflow-hidden rounded-3xl ring-1 ring-on-forest/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
        >
          <Image
            src="/logo.png"
            alt={`${site.name} — Care for furry pets`}
            width={851}
            height={315}
            sizes="(max-width: 768px) 100vw, 672px"
            className="h-auto w-full"
          />
        </Link>

        <p className="mx-auto mt-6 max-w-md text-center text-base leading-relaxed">
          {site.bio}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-11 place-items-center rounded-xl border border-on-forest/15 text-on-forest-muted transition-colors hover:border-honey/40 hover:bg-honey/10 hover:text-honey"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 border-t border-on-forest/10 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label="Footer">
            <h2 className="font-display text-lg font-semibold text-on-forest">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-honey">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg font-semibold text-on-forest">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.slug}/el-sobrante`}
                    className="transition-colors hover:text-honey"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-on-forest">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={telHref} className="flex items-start gap-3 transition-colors hover:text-honey">
                  <Phone className="mt-0.5 size-[18px] shrink-0 text-honey" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={mailtoHref} className="flex items-start gap-3 transition-colors hover:text-honey">
                  <Mail className="mt-0.5 size-[18px] shrink-0 text-honey" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-honey"
                >
                  <MapPin className="mt-0.5 size-[18px] shrink-0 text-honey" aria-hidden="true" />
                  {site.address.full}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-[18px] shrink-0 text-honey" aria-hidden="true" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-on-forest/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-on-forest-muted sm:flex-row sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Loving dog care in El Sobrante &amp; the East Bay.</p>
        </div>
      </div>
    </footer>
  );
}
