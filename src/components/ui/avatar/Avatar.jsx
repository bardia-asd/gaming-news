import { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import PropTypes from "prop-types";
import { cn } from "@/utils/utils";

/**
 * Root avatar component.
 *
 * Provides the container for avatar images
 * and fallback content.
 */
const Avatar = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex size-10 shrink-0 overflow-hidden rounded-full",
                className,
            )}
            {...props}>
            {children}
        </AvatarPrimitive.Root>
    );
});

Avatar.displayName = "Avatar";

/**
 * Runtime prop validation.
 */
Avatar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Avatar image component.
 *
 * Displays the user's profile image and
 * fills the avatar container.
 */
const AvatarImage = forwardRef(({ className = "", ...props }, ref) => {
    return (
        <AvatarPrimitive.Image
            ref={ref}
            className={cn("aspect-square size-full object-cover", className)}
            {...props}
        />
    );
});

AvatarImage.displayName = "AvatarImage";

/**
 * Runtime prop validation.
 */
AvatarImage.propTypes = {
    className: PropTypes.string,
};

/**
 * Avatar fallback component.
 *
 * Displays placeholder content when the
 * avatar image is unavailable.
 */
const AvatarFallback = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <AvatarPrimitive.Fallback
                ref={ref}
                className={cn(
                    "flex justify-center items-center size-full rounded-full bg-primary/15 font-medium text-primary",
                    className,
                )}
                {...props}>
                {children}
            </AvatarPrimitive.Fallback>
        );
    },
);

AvatarFallback.displayName = "AvatarFallback";

/**
 * Runtime prop validation.
 */
AvatarFallback.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export { Avatar, AvatarImage, AvatarFallback };
