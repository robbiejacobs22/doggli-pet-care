import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-60 active:translate-y-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-on-forest shadow-soft hover:-translate-y-0.5 hover:bg-forest-bright hover:shadow-lift",
        honey:
          "bg-honey text-forest-ink shadow-soft hover:-translate-y-0.5 hover:bg-honey-deep hover:shadow-honey",
        outline:
          "border border-line-strong bg-card text-ink hover:-translate-y-0.5 hover:border-forest hover:text-forest hover:shadow-soft",
        ghost: "text-ink hover:bg-sand",
        onForest:
          "bg-on-forest text-forest-ink shadow-soft hover:-translate-y-0.5 hover:bg-honey hover:shadow-honey",
        link: "text-forest underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-5 text-sm [&_svg]:size-4",
        md: "h-12 px-6 text-[0.95rem] [&_svg]:size-[18px]",
        lg: "h-14 px-8 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
