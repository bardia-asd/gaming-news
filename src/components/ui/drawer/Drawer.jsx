import { createContext, forwardRef, useContext } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

/**
 * Root Drawer component.
 *
 * Wraps the Vaul drawer primitive and provides
 * shared configuration through context.
 */
const Drawer = ({ shouldScaleBackground = true, children, ...props }) => {
    return (
        <DrawerPrimitive.Root
            shouldScaleBackground={shouldScaleBackground}
            {...props}>
            {children}
        </DrawerPrimitive.Root>
    );
};

/**
 * Runtime prop validation.
 */
Drawer.propTypes = {
    children: PropTypes.node,
    shouldScaleBackground: PropTypes.bool,
};

/**
 * Element that opens the drawer.
 */
const DrawerTrigger = DrawerPrimitive.Trigger;

/**
 * Renders drawer content inside a portal.
 */
const DrawerPortal = DrawerPrimitive.Portal;

/**
 * Element that closes the drawer.
 */
const DrawerClose = DrawerPrimitive.Close;

/**
 * Drawer backdrop.
 *
 * Covers the viewport behind the drawer content.
 */
const DrawerOverlay = forwardRef(({ className = "", ...props }, ref) => {
    return (
        <DrawerPrimitive.Overlay
            ref={ref}
            className={cn("fixed inset-0 z-50 bg-black/50", className)}
            {...props}
        />
    );
});

DrawerOverlay.displayName = "DrawerOverlay";

/**
 * Runtime prop validation.
 */
DrawerOverlay.propTypes = {
    className: PropTypes.string,
};

/**
 * Drawer content container.
 *
 * Renders the drawer panel and applies styles
 * based on the configured drawer direction.
 */
const DrawerContent = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <DrawerPortal>
                <DrawerOverlay />

                <DrawerPrimitive.Content
                    ref={ref}
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 flex flex-col bg-background shadow-lg border border-border h-auto",
                        className,
                    )}
                    {...props}>
                    {children}
                </DrawerPrimitive.Content>
            </DrawerPortal>
        );
    },
);

DrawerContent.displayName = "DrawerContent";

/**
 * Runtime prop validation.
 */
DrawerContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Drawer header container.
 *
 * Groups title and description content
 * with consistent spacing.
 */
const DrawerHeader = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col gap-1.5 text-center sm:text-start p-4",
                    className,
                )}
                {...props}>
                {children}
            </div>
        );
    },
);

DrawerHeader.displayName = "DrawerHeader";

/**
 * Runtime prop validation.
 */
DrawerHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Drawer footer container.
 *
 * Used for actions or controls placed
 * at the bottom of the drawer.
 */
const DrawerFooter = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-auto p-4 ",
                    className,
                )}
                {...props}>
                {children}
            </div>
        );
    },
);

DrawerFooter.displayName = "DrawerFooter";

/**
 * Runtime prop validation.
 */
DrawerFooter.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Drawer title component.
 *
 * Represents the primary heading of the drawer.
 */
const DrawerTitle = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <DrawerPrimitive.Title
                ref={ref}
                className={cn(
                    "text-lg font-semibold leading-none tracking-tight",
                    className,
                )}
                {...props}>
                {children}
            </DrawerPrimitive.Title>
        );
    },
);

DrawerTitle.displayName = "DrawerTitle";

/**
 * Runtime prop validation.
 */
DrawerTitle.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Drawer description component.
 *
 * Displays supporting text below the drawer title.
 */
const DrawerDescription = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <DrawerPrimitive.Description
                ref={ref}
                className={cn("text-sm text-muted-foreground", className)}
                {...props}>
                {children}
            </DrawerPrimitive.Description>
        );
    },
);

DrawerDescription.displayName = "DrawerDescription";

/**
 * Runtime prop validation.
 */
DrawerDescription.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
