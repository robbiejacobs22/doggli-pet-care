export const businessInfo = {
  name: 'Doggli Pet Care',
  tagline: 'Give Your Furry Friend the Best Day, Every Day!',
  bio: 'At Doggli, every dog deserves a day filled with fun and plenty of tail wags.',
  phone: '(510) 393-2881',
  email: 'dogili@gmail.com',
  hours: 'Flexible Hours: Early drop-off & late pick-up',
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    id: 'boarding',
    name: 'Boarding',
    icon: '🏠',
    description:
      'Your dog\'s home away from home. Cozy napping spots, outdoor play, and 24/7 love and care while you\'re away on vacation or need a break.',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'daycare',
    name: 'Daycare',
    icon: '☀️',
    description:
      'Fun in the sun with our spacious daycare area. Outdoor play, socialization, and plenty of tail wags to keep your pup happy and healthy.',
    span: 'md:col-span-2',
  },
  {
    id: 'walks',
    name: 'Dog Walking',
    icon: '🦮',
    description:
      'Scenic dog walks that keep your furry friend active, healthy, and loving life outdoors.',
    span: '',
  },
  {
    id: 'dropin',
    name: 'Drop-In Visits',
    icon: '🐾',
    description:
      'Quick check-ins when you need someone to pop by for feeding, potty breaks, and some belly rubs.',
    span: '',
  },
]

export const aboutStats = [
  { value: '500+', label: 'Happy Dogs' },
  { value: '5+', label: 'Years Experience' },
  { value: '4.9', label: 'Star Rating' },
]

export const whyChooseUs = [
  {
    icon: '🛡️',
    title: 'Safe Environment',
    description: 'Your dog\'s safety is our top priority with secure, supervised spaces.',
  },
  {
    icon: '❤️',
    title: 'Love & Affection',
    description: 'We treat your dog like our own, with genuine care and attention.',
  },
  {
    icon: '⏰',
    title: 'Flexible Hours',
    description: 'Early drop-off and late pick-up options that fit your schedule.',
  },
  {
    icon: '🏖️',
    title: 'Vacation Boarding',
    description: 'Going on a long trip? We\'ve got your furry friend covered.',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    text: 'Doggli has been a lifesaver! My golden retriever, Max, absolutely loves it there. He comes home tired and happy every single time. The care and attention is incredible.',
    rating: 5,
    dogName: 'Max',
  },
  {
    id: 2,
    name: 'James K.',
    text: 'I was nervous about leaving my puppy for the first time, but the team at Doggli made it so easy. They sent me updates throughout the day and my little Luna had the best time!',
    rating: 5,
    dogName: 'Luna',
  },
  {
    id: 3,
    name: 'Emily R.',
    text: 'The boarding service is phenomenal. We went on vacation for two weeks and our dog was treated like royalty. Highly recommend Doggli to every pet parent out there!',
    rating: 5,
    dogName: 'Buddy',
  },
]

export const galleryImages = [
  { id: 1, src: '/dogs/dog-1.png', alt: 'Two happy dogs posing together on a nature walk', caption: 'Best buds on an adventure!' },
  { id: 2, src: '/dogs/dog-2.png', alt: 'Dog getting paw care and love', caption: 'Paw care with love' },
  { id: 3, src: '/dogs/dog-3.png', alt: 'Happy dog running with a toy in spacious play area', caption: 'Ample space to play!' },
  { id: 4, src: '/dogs/dog-4.png', alt: 'Millah and Olive cuddling together', caption: 'Millah & Olive - Love at first sight!' },
]

export const pricingTiers = [
  {
    id: 'daypass',
    name: 'Day Pass',
    price: 35,
    period: 'day',
    description: 'Perfect for busy workdays',
    features: [
      'Full-day daycare',
      'Outdoor play sessions',
      'Feeding included',
      'Socialization time',
      'Daily updates',
    ],
    popular: false,
  },
  {
    id: 'weekend',
    name: 'Weekend Stay',
    price: 55,
    period: 'night',
    description: 'Ideal for short getaways',
    features: [
      'Overnight boarding',
      'Daily walks included',
      'Outdoor play sessions',
      'Cozy sleeping area',
      'Photo updates',
      'Feeding & treats',
    ],
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP Package',
    price: 85,
    period: 'night',
    description: 'The ultimate pampering experience',
    features: [
      'Everything in Weekend Stay',
      'One-on-one playtime',
      'Scenic premium walks',
      'Spa bath included',
      'Video updates',
      'Priority booking',
    ],
    popular: false,
  },
]
