import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/content";
import { site, telHref } from "@/lib/site";

export function Faq() {
  return (
    <Section id="faq" className="bg-sand grain">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Good to know"
            title="Questions, answered"
            emphasis="answered"
            subtitle="Everything first-time pet parents ask. Still wondering about something? We're a phone call away."
          />
          <Reveal className="mt-8 rounded-3xl border border-line bg-card p-6 shadow-soft">
            <span className="grid size-11 place-items-center rounded-2xl bg-honey-soft text-honey-deep">
              <MessageCircleQuestion className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="mt-4 font-medium text-forest-ink">Still have a question?</p>
            <p className="mt-1 text-sm text-stone">
              We&apos;re happy to talk through anything before your dog&apos;s first visit.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="primary" size="sm">
                <a href={telHref}>Call {site.phone}</a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/#book">Send a message</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
