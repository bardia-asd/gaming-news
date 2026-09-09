import PropTypes from "prop-types";
import { Toaster as Sonner } from "sonner";

/**
 * A reusable toast notification provider built on top of Sonner.
 *
 * Supports:
 * - Rich colored toast variants
 * - Close buttons on notifications
 * - Expandable toast notifications
 * - Configurable toast duration
 * - Consistent styling with the application's design system
 * - Additional Sonner props through `...props`
 */
const Toaster = ({ ...props }) => {
    return (
        <Sonner
            // Enable Sonner's built-in semantic toast colors
            richColors
            // Display a close button on each toast
            closeButton
            // Allow multiple toasts to expand vertically
            expand
            // Automatically dismiss toasts after 3 seconds
            duration={3000}
            toastOptions={{
                classNames: {
                    // Base toast styles
                    toast: "border border-border bg-background text-foreground shadow-lg",

                    // Toast title typography
                    title: "font-medium",

                    // Toast description typography
                    description: "text-muted-foreground",

                    // Action button styles
                    actionButton:
                        "bg-primary text-primary-foreground hover:opacity-90",

                    // Cancel button styles
                    cancelButton:
                        "bg-muted text-muted-foreground hover:bg-muted/80",
                },
            }}
            {...props}
        />
    );
};

Toaster.propTypes = {
    /**
     * Additional Sonner props.
     *
     * Sonner accepts various configuration props such as `position`,
     * `theme`, and other toast container options.
     */
    position: PropTypes.string,
    theme: PropTypes.string,
};

export { Toaster };
