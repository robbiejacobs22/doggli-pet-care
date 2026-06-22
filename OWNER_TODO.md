# Owner checklist — fill these in before launch

None of these block the site from running. They're the real-world details only you can
confirm. Each points to exactly where to make the change.

## Must confirm / replace

- [ ] **Production domain** — set `url` in `src/lib/site.ts` (currently
      `https://dogglipetcare.com`). Drives canonical URLs, sitemap, OG tags, and schema.
- [ ] **Email spelling** — confirm `dogili@gmail.com` vs `doggli@gmail.com` in
      `src/lib/site.ts` (`email`). Looks like it may be a typo.
- [ ] **Review count** — `rating.count` in `src/lib/site.ts` is a placeholder (`37`).
      Set the real number of Google reviews (rating value is `4.9`).
- [ ] **Form submissions** — these now post to **Formspree** (the existing
      `formspree.io/f/xbdapwvq` endpoint) so you get an email + an exportable
      spreadsheet of every Book-a-Stay / Send-a-Message submission. Confirm that
      endpoint is yours and active — or create your own free form at
      [formspree.io](https://formspree.io) and set `FORMSPREE_ENDPOINT` in Vercel.
- [ ] **Branded customer emails (Resend)** — to send customers the branded
      confirmation email: (1) create a free [Resend](https://resend.com) account
      and add `RESEND_API_KEY` in Vercel; (2) **verify your domain** in Resend
      (free — a few DNS records) and set `BOOKING_FROM_EMAIL` to an address on it,
      e.g. `Doggli Pet Care <hello@dogglipetcare.com>`. Until the domain is
      verified, Resend can't email customers, but Formspree still delivers
      everything. See `.env.example`.

## Content to enrich

- [ ] **Real Google reviews** — replace the 3 placeholder testimonials in
      `src/lib/content.ts` (`testimonials`) with real review text + author names.
      Optionally add a link to your Google reviews page.
- [ ] **More photos** — drop higher-res photos of the dogs, facility, owner, and play
      areas into `public/dogs/` and reference them in `galleryImages`
      (`src/lib/content.ts`). The gallery and pages are ready for more.
- [ ] **Owner/about photo** — `public/dogs/about.png` is used in the About section;
      swap if you have a better one.

## Business details to verify (used in copy, FAQ, and schema)

- [ ] **Licensed / insured?** — `src/lib/content.ts` (`trustItems` → "Insured &
      Licensed") states this as a placeholder. Confirm or adjust the wording.
- [ ] **Exact years in business** — currently "5+ years". Update in
      `src/lib/content.ts` (`stats`) and the About badge if different.
- [ ] **Vaccination policy** — FAQ answer in `src/lib/content.ts` (`faqs`) lists core
      vaccines as a placeholder. Confirm your exact requirements.
- [ ] **Exact hours / closed days** — currently "flexible, early & late". Update
      `hours` in `src/lib/site.ts` and the FAQ + `openingHoursSpecification` in
      `src/lib/schema.ts` if you keep set hours.
- [ ] **Cancellation policy & what to bring** — FAQ answers are sensible placeholders;
      confirm the specifics.
- [ ] **Geo coordinates** — `geo` in `src/lib/site.ts` is approximate for the address;
      refine if you want the map pin exact.

## Social / links

- [ ] **Social media** — Instagram, Facebook, and Nextdoor links in `src/lib/site.ts`
      (`socials`) were carried over from the previous site. Confirm they're correct;
      they feed the footer and schema `sameAs`.

## Optional polish

- [ ] Add a real **favicon** set (drop `icon.png`/`apple-icon.png` into `src/app/`).
- [ ] Consider a short intro **video** or more lifestyle photography for the hero/gallery.
