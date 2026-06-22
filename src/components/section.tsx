import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Standard vertical rhythm + max-width wrapper for page sections. */
export function Section({
  id,
  children,
  className,
  innerClassName,
  as: Tag = "section",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: ElementType;
}) {
  return (
    <Tag id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
