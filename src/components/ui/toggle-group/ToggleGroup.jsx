import { createContext, forwardRef, useContext } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

const toggleGroupVariants = cva(
    "inline-flex items-center justify-center gap-1",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                outline: "border border-input rounded-md p-1",
            },

            size: {
                default: "h-9",
                sm: "h-8",
                lg: "h-10",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const toggleGroupItemVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-transparent",

                outline:
                    "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
            },

            size: {
                default: "h-9 px-2 min-w-9",
                sm: "h-8 px-1.5 min-w-8",
                lg: "h-10 px-2.5 min-w-10",
            },
        },

        defaultVariants: {
            size: "default",
            variant: "default",
        },
    },
);

const ToggleGroupContext = createContext({
    variant: "default",
    size: "default",
});

const ToggleGroup = forwardRef(
    ({ className, variant, size, children, ...props }, ref) => {
        return (
            <ToggleGroupPrimitive.Root
                ref={ref}
                className={cn(
                    toggleGroupVariants({ variant, size }),
                    className,
                )}
                {...props}>
                <ToggleGroupContext.Provider value={{ variant, size }}>
                    {children}
                </ToggleGroupContext.Provider>
            </ToggleGroupPrimitive.Root>
        );
    },
);

ToggleGroup.displayName = "ToggleGroup";

ToggleGroup.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["default", "outline"]),
    size: PropTypes.oneOf(["default", "sm", "lg"]),
    children: PropTypes.node,
};

const ToggleGroupItem = forwardRef(
    ({ className, children, variant, size, ...props }, ref) => {
        const context = useContext(ToggleGroupContext);

        return (
            <ToggleGroupPrimitive.Item
                ref={ref}
                className={cn(
                    toggleGroupItemVariants({
                        variant: context.variant || variant,
                        size: context.size || size,
                    }),
                    className,
                )}
                {...props}>
                {children}
            </ToggleGroupPrimitive.Item>
        );
    },
);

ToggleGroupItem.displayName = "ToggleGroupItem";

ToggleGroupItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.oneOf(["default", "outline"]),
    size: PropTypes.oneOf(["default", "sm", "lg"]),
};

export { ToggleGroup, ToggleGroupItem };
