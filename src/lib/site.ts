/**
 * Central site configuration.
 *
 * ── OWNER TODO ──────────────────────────────────────────────────────────────
 * Update `url` to the real production domain before launch. Everything that
 * needs an absolute URL (canonical tags, sitemap, OG images, JSON-LD) reads
 * from here, so this is the single place to change it.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const site = {
  name: "Doggli Pet Care",
  shortName: "Doggli",
  // OWNER TODO: replace with the real production domain (no trailing slash).
  url: "https://dogglipetcare.com",
  tagline: "Give Your Furry Friend the Best Day, Every Day!",
  bio: "At Doggli, every dog deserves a day filled with fun and plenty of tail wags.",
  description:
    "Boutique dog boarding, daycare, walking, and drop-in visits in El Sobrante, CA. Trusted, loving, supervised care for East Bay pups — flexible hours, 4.9★ rated, 500+ happy dogs.",

  // Contact
  phone: "(510) 393-2881",
  phoneRaw: "+15103932881",
  // OWNER TODO: confirm email spelling — likely "doggli" not "dogili".
  email: "dogili@gmail.com",

  // Location
  address: {
    street: "4317 Santa Rita Rd",
    city: "El Sobrante",
    region: "CA",
    postalCode: "94803",
    country: "US",
    full: "4317 Santa Rita Rd, El Sobrante, CA 94803",
  },
  // Approx geo for 4317 Santa Rita Rd, El Sobrante, CA. OWNER TODO: refine if needed.
  geo: { latitude: 37.9787, longitude: -122.2964 },

  hours: "Flexible hours — early drop-off & late pick-up",
  priceRange: "$$",

  // OWNER TODO: confirm/replace these handles. Carried over from the existing site.
  socials: {
    instagram: "https://www.instagram.com/doggli_petcare/",
    facebook: "https://www.facebook.com/dogglipetcare/",
    nextdoor: "https://nextdoor.com/pages/doggli-pet-care-el-sobrante-ca/",
  },

  // Real Google rating for Doggli Pet Care (5.0★, 28 reviews as of this build).
  rating: { value: 5.0, count: 28 },
} as const;

export const sameAs = Object.values(site.socials);

/** tel: href helper */
export const telHref = `tel:${site.phoneRaw}`;
/** mailto: href helper */
export const mailtoHref = `mailto:${site.email}`;
/** Google Maps directions link for the facility. */
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.address.full,
)}`;
