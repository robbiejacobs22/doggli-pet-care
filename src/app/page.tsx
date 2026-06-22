import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { About } from "@/components/sections/about";
import { WhyChoose } from "@/components/sections/why-choose";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Faq } from "@/components/sections/faq";
import { ServiceArea } from "@/components/sections/service-area";
import { Booking } from "@/components/sections/booking";
import { JsonLd } from "@/components/json-ld";
import { localBusinessSchema, faqSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema()]} />
      <main id="main">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <WhyChoose />
        <Pricing />
        <Testimonials />
        <Gallery />
        <Faq />
        <ServiceArea />
        <Booking />
      </main>
    </>
  );
}
