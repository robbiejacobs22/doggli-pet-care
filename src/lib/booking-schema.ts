import { z } from "zod";

export const serviceOptions = [
  { value: "boarding", label: "Overnight Boarding" },
  { value: "daycare", label: "Daycare" },
  { value: "walking", label: "Dog Walking" },
  { value: "dropin", label: "Drop-In Visits" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const sizeOptions = [
  { value: "small", label: "Small (up to 20 lb)" },
  { value: "medium", label: "Medium (20–50 lb)" },
  { value: "large", label: "Large (50–90 lb)" },
  { value: "xlarge", label: "Extra large (90 lb+)" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

export const bookingSchema = z.object({
  // Step 1
  service: z.enum(["boarding", "daycare", "walking", "dropin", "not-sure"], {
    required_error: "Please choose a service",
  }),
  // Step 2
  startDate: z.string().min(1, "Please pick a start date"),
  endDate: z.string().optional(),
  dogCount: z.coerce.number().int().min(1).max(6).default(1),
  // Step 3
  dogName: z.string().min(1, "Your dog needs a name here!").max(60),
  breed: z.string().max(60).optional(),
  size: z.enum(["small", "medium", "large", "xlarge"], {
    required_error: "Pick a size",
  }),
  vaccinated: z.boolean().default(false),
  notes: z.string().max(1000).optional(),
  // Step 4
  ownerName: z.string().min(1, "Please add your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number").max(30),
  preferredContact: z.enum(["phone", "text", "email"]).default("phone"),
  // Anti-spam honeypot — must stay empty
  company: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Please add your name").max(80),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Tell us a little about your pup").max(1000),
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type SubmitResult = { ok: true } | { ok: false; error?: string };

export function serviceLabel(value: string) {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}
export function sizeLabel(value: string) {
  return sizeOptions.find((o) => o.value === value)?.label ?? value;
}
