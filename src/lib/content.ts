/**
 * Centralized site content — the one file the owner edits to update copy.
 *
 * Business facts (phone, address, socials, rating) live in `site.ts`.
 * Everything narrative — services, steps, testimonials, pricing, FAQ — lives here.
 *
 * Icons are referenced by name (a key into the lucide-react set, resolved in
 * `components/icon.tsx`) so this file stays a pure data module with no JSX.
 */
import type { IconName } from "@/components/icon";

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

export type Service = {
  id: string;
  name: string;
  icon: IconName;
  tagline: string;
  description: string;
  /** keyword used for /{service}/{city} local pages */
  slug: "dog-boarding" | "dog-daycare" | "dog-walking" | "drop-in-visits";
  /** featured = full-width feature card with a photo */
  featured?: boolean;
  /** background photo for the featured card */
  image?: string;
};

export const services: Service[] = [
  {
    id: "boarding",
    name: "Overnight Boarding",
    icon: "House",
    slug: "dog-boarding",
    tagline: "A home away from home",
    description:
      "Cozy napping spots, supervised play, and round-the-clock love while you're away. Your dog sleeps somewhere warm and wakes up to a friend.",
    featured: true,
    image: "/dogs/dog-4.png",
  },
  {
    id: "daycare",
    name: "Daycare",
    icon: "Sun",
    slug: "dog-daycare",
    tagline: "Fun all day, tired all night",
    description:
      "Spacious outdoor play and gentle socialization that keeps your pup happy, healthy, and ready for a good nap at home.",
  },
  {
    id: "walks",
    name: "Dog Walking",
    icon: "Footprints",
    slug: "dog-walking",
    tagline: "Scenic daily strolls",
    description:
      "Reliable, unhurried walks that keep your dog active and loving life outdoors — rain or shine.",
  },
  {
    id: "dropin",
    name: "Drop-In Visits",
    icon: "HeartHandshake",
    slug: "drop-in-visits",
    tagline: "A friendly check-in",
    description:
      "Feeding, potty breaks, fresh water, and a little belly-rub company when you can't be home.",
  },
];

export const stats = [
  { value: 500, suffix: "+", label: "Happy Dogs" },
  { value: 5, suffix: "+", label: "Years Caring" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
] as const;

export type TrustItem = { icon: IconName; title: string; description: string };

export const trustItems: TrustItem[] = [
  {
    icon: "ShieldCheck",
    title: "Safe & Supervised",
    description:
      "Secure indoor and outdoor spaces with constant supervision. Small groups, careful introductions, never left alone.",
  },
  {
    icon: "Heart",
    title: "Genuine Love",
    description:
      "We treat your dog like our own — patience for the shy ones, energy for the playful ones, and affection for all.",
  },
  {
    icon: "Clock",
    title: "Flexible Hours",
    description:
      "Early drop-off and late pick-up that fit real schedules. We work around your day, not the other way around.",
  },
  {
    icon: "Camera",
    title: "Daily Photo Updates",
    description:
      "Real photos and messages through the day so you can relax knowing exactly how your pup is doing.",
  },
  {
    icon: "Syringe",
    title: "Vaccination Policy",
    description:
      "Every guest is up to date on core vaccines, keeping the whole pack healthy and worry-free.",
  },
  {
    icon: "BadgeCheck",
    title: "Insured & Licensed",
    description:
      "Caring for dogs as a registered local business. (Owner to confirm exact licensing/insurance details.)",
  },
];

export type Step = { icon: IconName; title: string; description: string };

export const howItWorks: Step[] = [
  {
    icon: "Sparkles",
    title: "Meet & Greet",
    description:
      "We start with a free, no-pressure visit so your dog can sniff around, meet us, and feel at ease before any stay.",
  },
  {
    icon: "CalendarCheck",
    title: "Book Your Dates",
    description:
      "Tell us the service and dates. We confirm availability fast and walk you through exactly what to bring.",
  },
  {
    icon: "PawPrint",
    title: "Drop Off & Relax",
    description:
      "Hand off your pup to a familiar, friendly face. Early drop-off and late pick-up keep it stress-free.",
  },
  {
    icon: "ImageDown",
    title: "Daily Updates",
    description:
      "Get photos and messages through the day. Come home to a happy, well-loved, pleasantly tired dog.",
  },
];

export type Testimonial = {
  id: number;
  name: string;
  dogName: string;
  rating: number;
  text: string;
  /** OWNER TODO: replace placeholders with real Google review links/text. */
  source?: "Google";
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    dogName: "Max",
    rating: 5,
    source: "Google",
    text: "Doggli has been a lifesaver! My golden retriever, Max, absolutely loves it there. He comes home tired and happy every single time. The care and attention is incredible.",
  },
  {
    id: 2,
    name: "James K.",
    dogName: "Luna",
    rating: 5,
    source: "Google",
    text: "I was nervous about leaving my puppy for the first time, but the team at Doggli made it so easy. They sent me updates throughout the day and my little Luna had the best time!",
  },
  {
    id: 3,
    name: "Emily R.",
    dogName: "Buddy",
    rating: 5,
    source: "Google",
    text: "The boarding service is phenomenal. We went on vacation for two weeks and our dog was treated like royalty. Highly recommend Doggli to every pet parent out there!",
  },
];

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  /** layout hint for the masonry-style grid */
  tall?: boolean;
};

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/dogs/dog-1.png",
    alt: "Two happy dogs posing together on a nature walk",
    caption: "Best buds on an adventure",
    tall: true,
  },
  {
    id: 2,
    src: "/dogs/dog-2.png",
    alt: "A dog receiving gentle paw care",
    caption: "Paw care with love",
  },
  {
    id: 3,
    src: "/dogs/dog-3.png",
    alt: "A happy dog running with a toy in a spacious play area",
    caption: "Room to run and play",
  },
  {
    id: 4,
    src: "/dogs/dog-4.png",
    alt: "Two dogs, Millah and Olive, cuddling together",
    caption: "Millah & Olive — instant friends",
    tall: true,
  },
];

export type PricingTier = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  note?: string;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "daycare",
    name: "Day Care",
    price: 70,
    period: "day",
    description: "Perfect for busy workdays.",
    features: [
      "Full-day supervised daycare",
      "Outdoor play sessions",
      "Feeding included",
      "Gentle socialization",
      "Daily photo updates",
    ],
  },
  {
    id: "overnight",
    name: "Overnight",
    price: 100,
    period: "night",
    description: "Ideal for getaways and trips.",
    features: [
      "Overnight boarding",
      "Daily walks included",
      "Outdoor play sessions",
      "Cozy sleeping area",
      "Feeding & treats",
      "Photo updates",
    ],
    popular: true,
  },
  {
    id: "weekly",
    name: "7-Day Special",
    price: 600,
    period: "week",
    description: "Best value for longer stays.",
    features: [
      "Full week of boarding",
      "Daily walks & playtime",
      "Outdoor play sessions",
      "Cozy sleeping area",
      "Photo & video updates",
      "Feeding & treats",
    ],
    note: "Save $100 vs. the nightly rate",
  },
];

/**
 * FAQ — emitted as visible accordion AND FAQPage JSON-LD.
 * OWNER TODO: review every answer; placeholders are marked.
 */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What vaccinations does my dog need?",
    answer:
      "Dogs should be up to date on core vaccines — Rabies, DHPP (distemper/parvo), and Bordetella (kennel cough). Please bring a copy of records to the meet & greet. (Owner to confirm exact requirements.)",
  },
  {
    question: "Do you offer a meet & greet before boarding?",
    answer:
      "Yes — and we recommend it. A free, no-pressure visit lets your dog get comfortable with the space and with us before any overnight stay. It makes drop-off day far easier for everyone.",
  },
  {
    question: "What should I bring for my dog's stay?",
    answer:
      "Your dog's food (we keep their diet consistent), any medications with instructions, and a favorite toy or blanket for comfort. We provide bedding, bowls, and lots of love. (Owner to confirm specifics.)",
  },
  {
    question: "What are your hours for drop-off and pick-up?",
    answer:
      "We keep flexible hours with early drop-off and late pick-up to fit your schedule. Just let us know your timing when you book and we'll make it work. (Owner to confirm exact hours and any closed days.)",
  },
  {
    question: "How big are the play groups?",
    answer:
      "We keep groups small and matched by temperament and size, with careful introductions and constant supervision. Dogs who prefer their own space get quiet time too.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Please give us as much notice as possible so we can offer the spot to another pup. (Owner to confirm the exact cancellation window and any deposit policy.)",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We're based in El Sobrante and welcome dogs from across the East Bay — Richmond, El Cerrito, Pinole, Hercules, Berkeley, Oakland, and beyond. Boarding guests travel from all over the Bay Area.",
  },
];

/**
 * Service-area cities, used for the service-area section and the programmatic
 * /{service}/{city} local landing pages. Add a city here and pages generate
 * automatically (see app/[service]/[city]/page.tsx). Keep it genuine — only
 * list areas you actually serve.
 */
export type ServiceCity = {
  slug: string;
  name: string;
  /** short, true descriptor used in localized copy */
  blurb: string;
  /** roughly how the area relates to the facility, for natural local copy */
  proximity: string;
};

export const serviceCities: ServiceCity[] = [
  { slug: "el-sobrante", name: "El Sobrante", blurb: "our home turf", proximity: "right here in" },
  { slug: "richmond", name: "Richmond", blurb: "minutes away", proximity: "just south of us in" },
  { slug: "el-cerrito", name: "El Cerrito", blurb: "a short drive", proximity: "a quick hop from us in" },
  { slug: "pinole", name: "Pinole", blurb: "a short drive", proximity: "just up the road in" },
  { slug: "hercules", name: "Hercules", blurb: "a short drive", proximity: "nearby in" },
  { slug: "berkeley", name: "Berkeley", blurb: "an easy trip", proximity: "an easy drive from us in" },
  { slug: "albany", name: "Albany", blurb: "an easy trip", proximity: "a short drive from us in" },
  { slug: "oakland", name: "Oakland", blurb: "across the East Bay", proximity: "across the East Bay in" },
  { slug: "berkeley-hills", name: "Kensington", blurb: "nearby", proximity: "in the hills near us in" },
  { slug: "san-francisco", name: "San Francisco", blurb: "across the bay", proximity: "across the bay in" },
];

/** Service definitions keyed for the programmatic local pages. */
export type LocalService = {
  slug: string;
  label: string;
  /** H1 verb phrase, e.g. "Dog Boarding in {city}" */
  noun: string;
  blurb: string;
};

export const localServices: LocalService[] = [
  {
    slug: "dog-boarding",
    label: "Dog Boarding",
    noun: "Dog Boarding",
    blurb:
      "Overnight boarding in a real home setting — cozy beds, supervised play, and daily photo updates while you travel.",
  },
  {
    slug: "dog-daycare",
    label: "Dog Daycare",
    noun: "Dog Daycare",
    blurb:
      "Full-day supervised daycare with outdoor play and gentle socialization, so your pup comes home happily tired.",
  },
  {
    slug: "dog-walking",
    label: "Dog Walking",
    noun: "Dog Walking",
    blurb:
      "Reliable, unhurried walks that keep your dog active and loving life outdoors — scheduled around your day.",
  },
  {
    slug: "drop-in-visits",
    label: "Drop-In Visits",
    noun: "Drop-In Visits",
    blurb:
      "Friendly check-ins for feeding, potty breaks, fresh water, and company when you can't be home.",
  },
];
