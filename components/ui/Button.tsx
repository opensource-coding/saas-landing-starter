"use client";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "accent";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<
      { x: number; y: number; id: number }[]
    >([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

      // Call the original onClick if it exists
      onClick?.(e);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 1000);
    };

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "rounded-full transition-colors font-semibold relative overflow-hidden",
          // Variants
          {
            "bg-accent text-black hover:bg-accent-hover active:bg-accent-hover":
              variant === "accent",
            "border border-foreground hover:bg-foreground/5 hover:border-foreground/20":
              variant === "outline",
            "bg-foreground text-background hover:bg-foreground/90":
              variant === "default",
          },
          // Sizes
          {
            "px-5 py-3 text-sm": size === "default",
            "px-3 py-2 text-xs": size === "sm",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {props.children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute animate-ripple rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
            }}
          />
        ))}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
