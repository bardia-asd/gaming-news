import { forwardRef } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "../button";

/**
 * Root pagination component.
 *
 * Provides navigation between pages and
 * wraps all pagination subcomponents.
 */
const Pagination = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <nav
            ref={ref}
            role="navigation"
            aria-label="pagination"
            className={cn("flex justify-center w-full", className)}
            {...props}>
            {children}
        </nav>
    );
});

Pagination.displayName = "Pagination";

Pagination.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Pagination content container.
 *
 * Arranges pagination items horizontally
 * with consistent spacing.
 */
const PaginationContent = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <ul
                ref={ref}
                className={cn("flex items-center justify-center flex-wrap gap-1", className)}
                {...props}>
                {children}
            </ul>
        );
    },
);

PaginationContent.displayName = "PaginationContent";

PaginationContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Pagination item component.
 *
 * Wraps an individual pagination element
 * such as a page link or navigation button.
 */
const PaginationItem = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        return (
            <li ref={ref} className={cn(className)} {...props}>
                {children}
            </li>
        );
    },
);

PaginationItem.displayName = "PaginationItem";

PaginationItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * Pagination link component.
 *
 * Represents an individual page button and
 * supports an active state for the current page.
 */
const PaginationLink = ({
    children,
    isActive,
    size = "default",
    className = "",
    ...props
}) => {
    return (
        <Button
            aria-current={isActive ? "page" : undefined}
            size={size}
            className={cn(isActive && "border-primary", className)}
            variant={isActive ? "outline" : "ghost"}
            {...props}>
            {children}
        </Button>
    );
};

PaginationLink.displayName = "PaginationLink";

PaginationLink.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool,
    size: PropTypes.string,
    className: PropTypes.string,
};

/**
 * Previous page button.
 *
 * Navigates to the previous page in the sequence.
 */
const PaginationPrevious = ({ className = "", ...props }) => {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="icon"
            className={cn("gap-1", className)}
            {...props}>
            <ChevronLeft size={16} />
        </PaginationLink>
    );
};

PaginationPrevious.displayName = "PaginationPrevious";

PaginationPrevious.propTypes = {
    className: PropTypes.string,
};

/**
 * Next page button.
 *
 * Navigates to the next page in the sequence.
 */
const PaginationNext = ({ className = "", ...props }) => {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="icon"
            className={cn("gap-1", className)}
            {...props}>
            <ChevronRight size={16} />
        </PaginationLink>
    );
};

PaginationNext.displayName = "PaginationNext";

PaginationNext.propTypes = {
    className: PropTypes.string,
};

/**
 * Pagination ellipsis.
 *
 * Indicates that additional pages exist
 * between the visible page links.
 */
const PaginationEllipsis = ({ className = "", ...props }) => {
    return (
        <span
            aria-hidden
            className={cn("flex justify-center items-center size-9", className)}
            {...props}>
            {/* Screen reader description */}
            <span className="sr-only">صفحه‌های بیشتر</span>
            <MoreHorizontal size={16} />
        </span>
    );
};

PaginationEllipsis.displayName = "PaginationEllipsis";

PaginationEllipsis.propTypes = {
    className: PropTypes.string,
};

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
