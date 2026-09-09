import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/utils";
import { MoreHorizontal } from "lucide-react";

/**
 * Breadcrumbs root component.
 *
 * Provides semantic navigation
 * for the current page hierarchy.
 */
const Breadcrumbs = forwardRef(({ children, ...props }, ref) => {
    return (
        <nav ref={ref} aria-label="breadcrumb" {...props}>
            {children}
        </nav>
    );
});

Breadcrumbs.displayName = "Breadcrumbs";

Breadcrumbs.propTypes = {
    children: PropTypes.node,
};

/**
 * Breadcrumbs list component.
 *
 * Wraps breadcrumb items inside
 * an ordered list.
 */
const BreadcrumbsList = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <ol
                ref={ref}
                className={cn(
                    "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5",
                    className,
                )}
                {...props}>
                {children}
            </ol>
        );
    },
);

BreadcrumbsList.displayName = "BreadcrumbsList";

BreadcrumbsList.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Breadcrumb item component.
 *
 * Represents a single breadcrumb
 * entry within the list.
 */
const BreadcrumbsItem = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <li
                ref={ref}
                className={cn("inline-flex items-center gap-1.5", className)}
                {...props}>
                {children}
            </li>
        );
    },
);

BreadcrumbsItem.displayName = "BreadcrumbsItem";

BreadcrumbsItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Breadcrumb link component.
 *
 * Renders a breadcrumb as either
 * a native anchor or a custom component.
 */
const BreadcrumbsLink = forwardRef(
    ({ children, asChild, className = "", ...props }, ref) => {
        const Comp = asChild ? Slot : "a";

        return (
            <Comp
                ref={ref}
                className={cn(
                    "transition-colors hover:text-foreground",
                    className,
                )}
                {...props}>
                {children}
            </Comp>
        );
    },
);

BreadcrumbsLink.displayName = "BreadcrumbsLink";

BreadcrumbsLink.propTypes = {
    children: PropTypes.node,
    asChild: PropTypes.bool,
    className: PropTypes.string,
};

/**
 * Current breadcrumb page component.
 *
 * Indicates the active page
 * within the breadcrumb trail.
 */
const BreadcrumbsPage = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <span
                ref={ref}
                role="link"
                aria-disabled="true"
                aria-current="page"
                className={cn("text-foreground font-medium", className)}
                {...props}>
                {children}
            </span>
        );
    },
);

BreadcrumbsPage.displayName = "BreadcrumbsPage";

BreadcrumbsPage.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Breadcrumb separator component.
 *
 * Displays a separator between
 * consecutive breadcrumb items.
 */
const BreadcrumbsSeparator = ({ children, className = "", ...props }) => {
    return (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn("shrink-0 [&>svg]:size-3.5", className)}
            {...props}>
            {children ?? "/"}
        </li>
    );
};

BreadcrumbsSeparator.displayName = "BreadcrumbsSeparator";

BreadcrumbsSeparator.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Breadcrumb ellipsis component.
 *
 * Displays an overflow indicator
 * for collapsed breadcrumb items.
 */
const BreadcrumbsEllipsis = ({ className = "", ...props }) => {
    return (
        <span
            role="presentation"
            aria-hidden="true"
            className={cn("inline-flex items-center justify-center", className)}
            {...props}>
            <MoreHorizontal size={16} />
            <span className="sr-only">More</span>
        </span>
    );
};

BreadcrumbsEllipsis.displayName = "BreadcrumbsEllipsis";

BreadcrumbsEllipsis.propTypes = {
    className: PropTypes.string,
};

export {
    Breadcrumbs,
    BreadcrumbsList,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
    BreadcrumbsEllipsis,
};
