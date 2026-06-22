import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating = 5,
  className,
  size = 16,
}: {
  rating?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5 text-honey-deep", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={cn(i < Math.round(rating) ? "fill-honey text-honey-deep" : "text-line-strong")}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
