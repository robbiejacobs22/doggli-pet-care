# Doggli Pet Care — Website

A boutique marketing site for **Doggli Pet Care** — dog boarding, daycare, walking, and
drop-in visits in El Sobrante, CA & the East Bay. Built to convert nervous pet parents
into bookings, rank in local Bay Area search, and feel as warm and premium as the care
itself.

## Tech stack

- **Next.js 16** (App Router, React Server Components) + **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme` in `src/app/globals.css`)
- **shadcn-style primitives** on Radix UI (`button`, `accordion`, `dialog`, form fields)
- **Motion** (Framer Motion) for restrained, reduced-motion-aware animation
- **lucide-react** icons (no emoji-as-iconography anywhere)
- **next/font** — Fraunces (display) + Inter (body)
- **Resend** for booking/contact emails, with a graceful `mailto:` fallback
- Deploys to **Vercel** with zero config

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (all optional for local dev)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Environment variables

Copy `.env.example` → `.env.local` (git-ignored). On Vercel, add these under
**Project Settings → Environment Variables**.

| Variable | Required? | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Recommended | Sends booking + contact emails. **If unset, forms fall back to opening the visitor's email client with everything prefilled — nothing is ever lost.** |
| `BOOKING_FROM_EMAIL` | With Resend | The verified "from" address, e.g. `"Doggli Pet Care <bookings@dogglipetcare.com>"`. Until you verify a domain in Resend, the sandbox `onboarding@resend.dev` works. |
| `BOOKING_TO_EMAIL` | Optional | Where notifications are delivered. Defaults to the business email in `src/lib/site.ts`. |

To enable real emails: create a [Resend](https://resend.com) account, verify your
sending domain, create an API key, and set the three variables above.

## Editing content (no code knowledge needed)

Almost all copy lives in two files:

- **`src/lib/site.ts`** — business facts: name, phone, email, address, geo, hours,
  social links, star rating, and the **production domain** (`url`).
- **`src/lib/content.ts`** — services, the "how it works" steps, trust points,
  testimonials, gallery captions, pricing tiers, FAQ, and the service-area cities.

Both files have inline `OWNER TODO` comments marking anything that needs your input.
Change a value, save, and the site updates everywhere it's used.

### Adding a service-area / local SEO page

The site auto-generates a landing page for every **service × city** combination at
`/{service}/{city}` (e.g. `/dog-boarding/berkeley`). To add a city, add one entry to
`serviceCities` in `src/lib/content.ts`:

```ts
{ slug: "san-pablo", name: "San Pablo", blurb: "minutes away", proximity: "just north of us in" },
```

Pages, internal links, sitemap entries, and local schema are generated automatically on
the next build. Keep the list to areas you genuinely serve.

## SEO & structured data

- Per-page metadata via the Next.js **Metadata API** (title, description, canonical,
  Open Graph + Twitter cards). A branded OG image is generated at `/opengraph-image`.
- **JSON-LD**: `LocalBusiness`/`AnimalCareBusiness` (with geo, hours, `areaServed`,
  `aggregateRating`, and `Review`s), `FAQPage`, `BreadcrumbList`, and per-page `Service`.
- `sitemap.xml` and `robots.txt` are generated (`src/app/sitemap.ts`, `src/app/robots.ts`).
- All pages are statically prerendered for excellent Core Web Vitals.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, global metadata, nav/footer chrome, skip link
    page.tsx              # home page (composes the sections)
    actions.ts            # server actions: sendBooking / sendContact (Resend)
    [service]/[city]/     # programmatic local SEO landing pages
    sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
    globals.css           # Tailwind v4 + design tokens (OKLCH)
  components/
    layout/               # navbar, footer, mobile CTA bar
    sections/             # hero, services, how-it-works, about, why-choose,
                          # pricing, testimonials, gallery, faq, service-area, booking
    booking/              # multi-step booking form + contact dialog
    ui/                   # button, accordion, dialog, form fields
    motion/               # reveal-on-scroll helpers
  lib/
    site.ts content.ts    # ← edit these to update the site
    schema.ts booking-schema.ts utils.ts
public/
  dogs/ logo.png          # imagery
```

## Deploying to Vercel

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Add the environment variables above.
3. Deploy. No build configuration is required.
4. Point your domain at the project, then update `url` in `src/lib/site.ts` to match
   (this drives canonical URLs, the sitemap, OG tags, and schema).

## Owner checklist

See **`OWNER_TODO.md`** for the short list of placeholders to confirm or replace
before launch (domain, email spelling, review count, photos, credentials, hours).
