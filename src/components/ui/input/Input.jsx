import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/utils";

/**
 * A reusable input component built on top of the native HTML input element.
 *
 * Supports:
 * - All standard HTML input attributes through `...props`
 * - Forwarding refs to the underlying input element
 * - Custom styling through `className`
 * - Different input types through the `type` prop
 */
const Input = forwardRef(({ type = "text", className = "", ...props }, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                // Base input styles
                "w-full h-9 border border-input rounded-md px-3 py-1",

                // Typography and background
                "text-base md:text-sm bg-transparent",

                // Placeholder and shadow
                "shadow-sm placeholder:text-muted-foreground",

                // Focus styles
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",

                // Smooth state transitions
                "transition-colors",

                // Disabled state
                "disabled:cursor-not-allowed disabled:opacity-50",

                // Allow consumers to override or extend the default styles
                className,
            )}
            {...props}
        />
    );
});

Input.displayName = "Input";

Input.propTypes = {
    /**
     * Specifies the type of input.
     * Defaults to "text".
     */
    type: PropTypes.string,

    /**
     * Additional Tailwind CSS classes.
     */
    className: PropTypes.string,
};

export { Input };
