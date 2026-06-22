import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  subtitle,
  align = "center",
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  /** word/phrase within title to highlight in the accent color */
  emphasis?: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "default" | "onForest";
}) {
  const onForest = tone === "onForest";

  const renderTitle = () => {
    if (!emphasis || !title.includes(emphasis)) return title;
    const [before, after] = title.split(emphasis);
    return (
      <>
        {before}
        <em className={cn("not-italic", onForest ? "text-honey" : "text-clay")}>
          {emphasis}
        </em>
        {after}
      </>
    );
  };

  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", onForest && "text-honey")}>{eyebrow}</span>
      )}
      <h2
        className={cn(
          "text-pretty text-4xl font-semibold leading-[1.08] sm:text-5xl",
          onForest && "text-on-forest",
        )}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            onForest ? "text-on-forest-muted" : "text-stone",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
