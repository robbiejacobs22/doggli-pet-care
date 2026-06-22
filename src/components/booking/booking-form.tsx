"use client";

import { useEffect, useState } from "react";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  PartyPopper,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/field";
import { Icon } from "@/components/icon";
import { sendBooking } from "@/app/actions";
import {
  bookingSchema,
  serviceOptions,
  sizeOptions,
  contactMethods,
  serviceLabel,
  sizeLabel,
  type BookingInput,
} from "@/lib/booking-schema";
import type { IconName } from "@/components/icon";
import { site, telHref } from "@/lib/site";

const steps: { title: string; fields: Path<BookingInput>[] }[] = [
  { title: "Service", fields: ["service"] },
  { title: "Dates", fields: ["startDate", "endDate", "dogCount"] },
  { title: "Your dog", fields: ["dogName", "breed", "size", "vaccinated", "notes"] },
  { title: "Your details", fields: ["ownerName", "email", "phone", "preferredContact"] },
  { title: "Review", fields: [] },
];

const serviceIconMap: Record<string, IconName> = {
  boarding: "House",
  daycare: "Sun",
  walking: "Footprints",
  dropin: "HeartHandshake",
};
const serviceIcon = (value: string): IconName => serviceIconMap[value] ?? "PawPrint";

export function BookingForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      dogCount: 1,
      vaccinated: false,
      preferredContact: "phone",
      service: undefined,
    },
  });

  const isLast = step === steps.length - 1;
  const selectedService = watch("service");

  async function next() {
    const valid = await trigger(steps[step].fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit(values: BookingInput) {
    setStatus("submitting");
    setErrorMsg("");
    const result = await sendBooking(values);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please call us instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-line bg-card p-8 text-center shadow-soft">
        <motion.span
          initial={reduce ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="grid size-16 place-items-center rounded-full bg-honey-soft text-honey-deep"
        >
          <PartyPopper className="size-8" aria-hidden="true" />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-forest-ink">
          Request sent — yay!
        </h3>
        <p className="mt-2 max-w-sm text-stone">
          Thanks for reaching out. We&apos;ll be in touch very soon. Your pup is
          going to love it here!
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" size="md">
            <a href={telHref}>
              <Phone className="size-4" /> {site.phone}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => {
              setStatus("idle");
              setStep(0);
            }}
          >
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-card p-6 shadow-lift sm:p-8">
      {/* Progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-forest-ink">{steps[step].title}</span>
          <span className="text-stone">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-honey"
            initial={false}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Company
            <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
          </label>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {/* STEP 0 — Service */}
            {step === 0 && (
              <fieldset className="space-y-3">
                <legend className="sr-only">Choose a service</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {serviceOptions.map((opt) => {
                    const active = selectedService === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all ${
                          active
                            ? "border-forest bg-honey-soft/40 shadow-soft"
                            : "border-line bg-card hover:border-line-strong"
                        }`}
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          className="peer sr-only"
                          {...register("service")}
                        />
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                            active ? "bg-forest text-honey" : "bg-sand text-forest"
                          }`}
                        >
                          {opt.value === "not-sure" ? (
                            <ArrowRight className="size-5" aria-hidden="true" />
                          ) : (
                            <Icon name={serviceIcon(opt.value)} className="size-5" />
                          )}
                        </span>
                        <span className="font-medium text-ink">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
                <FieldError>{errors.service?.message}</FieldError>
              </fieldset>
            )}

            {/* STEP 1 — Dates */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="startDate">Start date</Label>
                    <Input id="startDate" type="date" min={today} {...register("startDate")} />
                    <FieldError>{errors.startDate?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor="endDate">End date (optional)</Label>
                    <Input id="endDate" type="date" min={watch("startDate") || today} {...register("endDate")} />
                    <FieldError>{errors.endDate?.message}</FieldError>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dogCount">How many dogs?</Label>
                  <Select id="dogCount" {...register("dogCount")}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "dog" : "dogs"}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            )}

            {/* STEP 2 — Dog details */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="dogName">Dog&apos;s name</Label>
                    <Input id="dogName" placeholder="e.g. Max" {...register("dogName")} />
                    <FieldError>{errors.dogName?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor="breed">Breed (optional)</Label>
                    <Input id="breed" placeholder="e.g. Golden Retriever" {...register("breed")} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select id="size" defaultValue="" {...register("size")}>
                    <option value="" disabled>
                      Choose a size…
                    </option>
                    {sizeOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                  <FieldError>{errors.size?.message}</FieldError>
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-line bg-sand/50 p-4">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-5 rounded border-line-strong accent-[oklch(40%_0.058_158)]"
                    {...register("vaccinated")}
                  />
                  <span className="text-sm text-ink">
                    My dog is up to date on core vaccinations (Rabies, DHPP, Bordetella).
                    <span className="block text-stone">We&apos;ll confirm records at the meet &amp; greet.</span>
                  </span>
                </label>
                <div>
                  <Label htmlFor="notes">Anything we should know? (optional)</Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Allergies, routines, favorite toys, special needs…"
                    {...register("notes")}
                  />
                </div>
              </div>
            )}

            {/* STEP 3 — Owner details */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="ownerName">Your name</Label>
                  <Input id="ownerName" placeholder="Your full name" autoComplete="name" {...register("ownerName")} />
                  <FieldError>{errors.ownerName?.message}</FieldError>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@email.com" autoComplete="email" {...register("email")} />
                    <FieldError>{errors.email?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(510) 555-0123" autoComplete="tel" {...register("phone")} />
                    <FieldError>{errors.phone?.message}</FieldError>
                  </div>
                </div>
                <div>
                  <Label>Preferred way to reach you</Label>
                  <div className="flex flex-wrap gap-2">
                    {contactMethods.map((m) => {
                      const active = watch("preferredContact") === m.value;
                      return (
                        <button
                          type="button"
                          key={m.value}
                          onClick={() => setValue("preferredContact", m.value)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            active
                              ? "border-forest bg-forest text-on-forest"
                              : "border-line-strong bg-card text-ink hover:border-forest"
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Review */}
            {step === 4 && (
              <ReviewStep values={getValues()} />
            )}
          </motion.div>
        </AnimatePresence>

        {errorMsg && (
          <p className="mt-4 rounded-xl bg-clay-soft px-4 py-3 text-sm text-clay">
            {errorMsg}{" "}
            <a href={telHref} className="font-semibold underline">
              Call {site.phone}
            </a>
          </p>
        )}

        {/* Nav */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            className={step === 0 ? "invisible" : ""}
          >
            <ArrowLeft className="size-4" /> Back
          </Button>

          {!isLast ? (
            <Button type="button" variant="primary" size="md" onClick={next}>
              Continue <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" variant="honey" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-5" /> Send request
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function ReviewStep({ values }: { values: BookingInput }) {
  const rows: [string, string][] = [
    ["Service", serviceLabel(values.service)],
    [
      "Dates",
      `${values.startDate || "—"}${values.endDate ? ` → ${values.endDate}` : ""}`,
    ],
    ["Dogs", String(values.dogCount ?? 1)],
    ["Dog", `${values.dogName}${values.breed ? ` · ${values.breed}` : ""}`],
    ["Size", values.size ? sizeLabel(values.size) : "—"],
    ["Vaccinated", values.vaccinated ? "Yes" : "To confirm"],
    ["Name", values.ownerName],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Reach via", values.preferredContact],
  ];
  return (
    <div>
      <p className="mb-4 text-sm text-stone">
        Quick look before you send — everything correct?
      </p>
      <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 bg-card px-4 py-3">
            <dt className="text-sm text-stone">{k}</dt>
            <dd className="text-right text-sm font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      {values.notes && (
        <div className="mt-3 rounded-2xl border border-line bg-sand/50 px-4 py-3">
          <p className="text-sm text-stone">Notes</p>
          <p className="mt-1 text-sm text-ink">{values.notes}</p>
        </div>
      )}
    </div>
  );
}
