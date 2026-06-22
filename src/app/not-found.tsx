import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, telHref } from "@/lib/site";

export default function NotFound() {
  return (
    <main
      id="main"
      className="grid min-h-[70vh] place-items-center px-4 pt-28 text-center"
    >
      <div className="max-w-md">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-4 text-6xl font-semibold text-forest-ink">Woof.</h1>
        <p className="mt-4 text-lg text-stone">
          We couldn&apos;t fetch that page. It may have wandered off — let&apos;s
          get you back home.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg">
            <Link href="/">
              <Home className="size-5" /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={telHref}>
              <Phone className="size-5" /> {site.phone}
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
