/**
 * Icon registry. Content data references icons by name (a key here) so the
 * data modules stay pure (no JSX). This keeps a single, cohesive icon set —
 * lucide-react — and bans emoji-as-iconography across the site.
 */
import {
  BadgeCheck,
  CalendarCheck,
  Camera,
  Clock,
  Footprints,
  Heart,
  HeartHandshake,
  House,
  ImageDown,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Sun,
  Syringe,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  BadgeCheck,
  CalendarCheck,
  Camera,
  Clock,
  Footprints,
  Heart,
  HeartHandshake,
  House,
  ImageDown,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Sun,
  Syringe,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
