"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError } from "@/components/ui/field";
import { sendContact } from "@/app/actions";
import { contactSchema, type ContactInput } from "@/lib/booking-schema";
import { site, telHref } from "@/lib/site";

export function ContactDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: "onTouched" });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    const result = await sendContact(values);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setStatus("idle");
          reset();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {status === "success" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-honey-soft text-honey-deep">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-forest-ink">
              Message sent!
            </h3>
            <p className="mt-1 text-sm text-stone">We&apos;ll reply as soon as we can.</p>
            <Button className="mt-5" variant="outline" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Send us a message</DialogTitle>
              <DialogDescription>
                Prefer a quick note? We usually reply within a few hours. Or call{" "}
                <a href={telHref} className="font-medium text-forest underline">
                  {site.phone}
                </a>
                .
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
              </div>
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" autoComplete="name" {...register("name")} />
                <FieldError>{errors.name?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" type="email" autoComplete="email" {...register("email")} />
                <FieldError>{errors.email?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="c-message">Message</Label>
                <Textarea
                  id="c-message"
                  rows={4}
                  placeholder="Tell us about your pup…"
                  {...register("message")}
                />
                <FieldError>{errors.message?.message}</FieldError>
              </div>
              {status === "error" && (
                <p className="rounded-xl bg-clay-soft px-4 py-3 text-sm text-clay">
                  Something went wrong.{" "}
                  <a href={telHref} className="font-semibold underline">
                    Call us instead
                  </a>
                  .
                </p>
              )}
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
