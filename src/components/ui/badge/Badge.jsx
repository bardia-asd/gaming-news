import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

/**
 * Defines the available visual variants for the Badge component.
 *
 * `cva` keeps the base styles shared between all variants while allowing
 * each variant to define its own appearance.
 */
export const badgeVariants = cva(
    // Base styles shared by every badge variant
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                // Primary badge
                default:
                    "border-transparent bg-primary text-primary-foreground shadow",

                // Secondary badge
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground",

                // Destructive or error state
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow",

                // Badge with a transparent background and visible text
                outline: "text-foreground",
            },
        },

        // Used when no variant is explicitly provided
        defaultVariants: {
            variant: "default",
        },
    },
);

/**
 * A reusable badge component for displaying short labels, statuses,
 * categories, or other small pieces of contextual information.
 *
 * Supports:
 * - Multiple visual variants
 * - Custom Tailwind CSS classes through `className`
 * - Any additional HTML div attributes through `...props`
 * - React nodes as badge content through `children`
 */
const Badge = ({ children, variant = "default", className = "", ...props }) => {
    return (
        <div
            className={cn(
                // Apply the selected variant styles and custom classes
                badgeVariants({ variant }),
                className,
            )}
            {...props}>
            {children}
        </div>
    );
};

Badge.propTypes = {
    /**
     * Content displayed inside the badge.
     */
    children: PropTypes.node,

    /**
     * Controls the visual style of the badge.
     */
    variant: PropTypes.oneOf([
        "default",
        "secondary",
        "destructive",
        "outline",
    ]),

    /**
     * Additional Tailwind CSS classes.
     */
    className: PropTypes.string,
};

export { Badge };
