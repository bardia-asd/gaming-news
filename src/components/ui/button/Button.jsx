import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/utils";
import { Slot } from "@radix-ui/react-slot";

/**
 * Button style variants using Class Variance Authority (CVA).
 *
 * Base classes are shared across every button, while variants allow
 * different visual styles, sizes, border radius, and width without
 * manually concatenating Tailwind classes.
 */
export const buttonVariants = cva(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary-hover",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                outline:
                    "border border-input bg-background hover:bg-accent hover:border-primary shadow-sm hover:text-accent-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4",
                sm: "h-8 px-3 text-xs",
                lg: "h-10 px-4",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

/**
 * Reusable Button component.
 *
 * Features:
 * - Multiple visual variants
 * - Different sizes
 * - Configurable border radius
 * - Optional full-width mode
 * - Supports polymorphic rendering through the `as` prop
 * - Forwards refs to the underlying element
 */
const Button = forwardRef(
    (
        { children, variant, size, asChild = false, className = "", ...props },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref}
                className={cn(
                    // Merge CVA-generated classes with custom classes.
                    buttonVariants({
                        variant,
                        size,
                    }),
                    className,
                )}
                {...props}>
                {children}
            </Comp>
        );
    },
);

Button.displayName = "Button";

/**
 * Runtime prop validation.
 */
Button.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf([
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
    ]),
    size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
    asChild: PropTypes.bool,
    className: PropTypes.string,
};

export { Button };
