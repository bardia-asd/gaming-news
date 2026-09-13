import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import PropTypes from "prop-types";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/utils";

/**
 * Root select component.
 *
 * Manages the select state and provides context
 * for all select subcomponents.
 */
const Select = SelectPrimitive.Root;

/**
 * Groups related select items.
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * Displays the currently selected value.
 */
const SelectValue = SelectPrimitive.Value;

/**
 * Select trigger component.
 *
 * Opens the select dropdown and displays
 * the currently selected value.
 */
const SelectTrigger = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <SelectPrimitive.Trigger
                ref={ref}
                className={cn(
                    "group flex items-center justify-between h-9 w-full whitespace-nowrap rounded-md border border-input bg-transparent text-sm px-3 py-2 shadow cursor-pointer data-placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors [&_svg]:shrink-0",
                    className,
                )}
                {...props}>
                {children}
                <SelectPrimitive.Icon asChild>
                    <ChevronDown className="size-4 opacity-50 group-data-[state=open]:rotate-180 transition-transform duration-200 " />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
        );
    },
);

SelectTrigger.displayName = "SelectTrigger";

SelectTrigger.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Scroll up button.
 *
 * Appears automatically when the list is scrollable
 * and there are additional items above the viewport.
 */
const SelectScrollUpButton = forwardRef(({ className = "", ...props }, ref) => {
    return (
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className,
            )}
            {...props}>
            <ChevronUp className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    );
});

SelectScrollUpButton.displayName = "SelectScrollUpButton";

SelectScrollUpButton.propTypes = {
    className: PropTypes.string,
};

/**
 * Scroll down button.
 *
 * Appears automatically when the list is scrollable
 * and there are additional items below the viewport.
 */
const SelectScrollDownButton = forwardRef(
    ({ className = "", ...props }, ref) => {
        return (
            <SelectPrimitive.ScrollDownButton
                ref={ref}
                className={cn(
                    "flex cursor-default items-center justify-center py-1",
                    className,
                )}
                {...props}>
                <ChevronDown className="size-4" />
            </SelectPrimitive.ScrollDownButton>
        );
    },
);

SelectScrollDownButton.displayName = "SelectScrollDownButton";

SelectScrollDownButton.propTypes = {
    className: PropTypes.string,
};

/**
 * Select content container.
 *
 * Renders the dropdown menu inside a portal with
 * configurable positioning and animated transitions.
 */
const SelectContent = forwardRef(
    (
        {
            children,
            position = "popper",
            sideOffset = 8,
            className = "",
            ...props
        },
        ref,
    ) => {
        return (
            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    ref={ref}
                    className={cn(
                        "relative z-50 max-h-(--radix-select-content-available-height) min-w-32 overflow-y-auto overflow-x-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down data-[side=left]:animate-slide-left data-[side=right]:animate-slide-right origin-(--radix-select-content-transform-origin)",
                        className,
                    )}
                    sideOffset={sideOffset}
                    position={position}
                    {...props}>
                    {/* Scroll controls */}
                    <SelectScrollUpButton />

                    {/* Select items */}
                    <SelectPrimitive.Viewport
                        className={cn(
                            "p-1",
                            position === "popper" &&
                                "w-full min-w-[var(--radix-select-trigger-width)]",
                        )}>
                        {children}
                    </SelectPrimitive.Viewport>
                    <SelectScrollDownButton />
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        );
    },
);

SelectContent.displayName = "SelectContent";

SelectContent.propTypes = {
    children: PropTypes.node,
    position: PropTypes.oneOf(["item-aligned", "popper"]),
    sideOffset: PropTypes.number,
    className: PropTypes.string,
};

/**
 * Select label component.
 *
 * Displays a non-interactive heading
 * for a group of select items.
 */
const SelectLabel = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <SelectPrimitive.Label
                ref={ref}
                className={cn("px-2 py-1.5 text-sm font-semibold", className)}
                {...props}>
                {children}
            </SelectPrimitive.Label>
        );
    },
);

SelectLabel.displayName = "SelectLabel";

SelectLabel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Select item component.
 *
 * Represents a selectable option
 * within the select dropdown.
 */
const SelectItem = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <SelectPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex items-center justify-between cursor-default w-full rounded-md py-2.5 ps-2 pe-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
                className,
            )}
            {...props}>
            {/* Selected item indicator */}
            <span className="absolute inset-e-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
});

SelectItem.displayName = "SelectItem";

SelectItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Select separator component.
 *
 * Visually separates groups of select items.
 */
const SelectSeparator = forwardRef(({ className = "", ...props }, ref) => {
    return (
        <SelectPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    );
});

SelectSeparator.displayName = "SelectSeparator";

SelectSeparator.propTypes = {
    className: PropTypes.string,
};

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
};
