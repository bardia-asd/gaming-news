import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/utils";

/**
 * Root Card component.
 *
 * Provides the container for card-related content with
 * consistent styling, border, background, and shadow.
 */
const Card = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "bg-card rounded-xl border border-border text-card-foreground shadow",
                className,
            )}
            {...props}>
            {children}
        </div>
    );
});

Card.displayName = "Card";

/**
 * Runtime prop validation.
 */
Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Card header container.
 *
 * Used for titles, descriptions, and actions at the top
 * of a card with consistent spacing and alignment.
 */
const CardHeader = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex items-start justify-between gap-4 p-4",
                className,
            )}
            {...props}>
            {children}
        </div>
    );
});

CardHeader.displayName = "CardHeader";

/**
 * Runtime prop validation.
 */
CardHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Card title component.
 *
 * Displays the primary heading within a card.
 */
const CardTitle = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={cn(
                "font-semibold tracking-tight leading-none",
                className,
            )}
            {...props}>
            {children}
        </h3>
    );
});

CardTitle.displayName = "CardTitle";

/**
 * Runtime prop validation.
 */
CardTitle.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Card description component.
 *
 * Displays supporting text beneath the card title.
 */
const CardDescription = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={cn("text-sm text-muted-foreground", className)}
                {...props}>
                {children}
            </p>
        );
    },
);

CardDescription.displayName = "CardDescription";

/**
 * Runtime prop validation.
 */
CardDescription.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Card content container.
 *
 * Wraps the main content of the card with consistent padding.
 */
const CardContent = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div ref={ref} className={cn("p-4 pt-0", className)} {...props}>
                {children}
            </div>
        );
    },
);

CardContent.displayName = "CardContent";

/**
 * Runtime prop validation.
 */
CardContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Card footer container.
 *
 * Used for actions or supplementary content displayed
 * at the bottom of the card.
 */
const CardFooter = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex items-center gap-4 p-4 pt-0", className)}
            {...props}>
            {children}
        </div>
    );
});

CardFooter.displayName = "CardFooter";

/**
 * Runtime prop validation.
 */
CardFooter.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
};
