import PropTypes from "prop-types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";

// Build the list of page numbers and ellipses displayed by the pagination component.
const getPageRange = (current, total, siblingCount = 1) => {
    // Calculate the maximum number of page items that can be shown
    // without needing ellipses.
    const maxVisiblePages = siblingCount * 2 + 5;

    // Show every page when the total page count is small enough.
    if (total <= maxVisiblePages) {
        const allPages = [];

        // Create a list containing every page number.
        for (let page = 1; page <= total; page++) {
            allPages.push(page);
        }

        return allPages;
    }

    // Calculate the first and last page numbers around the current page.
    const leftSiblings = Math.max(current - siblingCount, 1);
    const rightSiblings = Math.min(current + siblingCount, total);

    // Determine whether there is a hidden range between the first page
    // and the current page's sibling range.
    const hasLeftGap = leftSiblings > 2;

    // Determine whether there is a hidden range between the current page's
    // sibling range and the last page.
    const hasRightGap = rightSiblings < total - 1;

    // When there is no left gap but there is a right gap,
    // show the first pages, an ellipsis, and the final page.
    if (!hasLeftGap && hasRightGap) {
        const visibleCount = 3 + siblingCount * 2;
        const startPages = [];

        // Generate the visible pages at the beginning of the list.
        for (let page = 1; page <= visibleCount; page++) {
            startPages.push(page);
        }

        return [...startPages, "...", total];
    }

    // When there is a left gap but no right gap,
    // show the first page, an ellipsis, and the final pages.
    if (hasLeftGap && !hasRightGap) {
        const visibleCount = 3 + siblingCount * 2;
        const endPages = [];

        // Generate the visible pages at the end of the list.
        for (let page = total - visibleCount + 1; page <= total; page++) {
            endPages.push(page);
        }

        return [1, "...", ...endPages];
    }

    // Generate the pages surrounding the current page.
    const middlePages = [];

    for (let page = leftSiblings; page <= rightSiblings; page++) {
        middlePages.push(page);
    }

    // Show the first page, left ellipsis, middle pages,
    // right ellipsis, and final page.
    return [1, "...", ...middlePages, "...", total];
};

// Render pagination controls for navigating between pages.
const ListPagination = ({ currentPage, totalPages, onPageChange }) => {
    // Hide pagination when there is only one page.
    if (totalPages <= 1) return null;

    // Change the current page and scroll the user back to the top.
    const handlePageChange = (page) => {
        onPageChange(page);

        // Return to the top of the list after changing pages.
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Build the visible page numbers and ellipses.
    const pages = getPageRange(currentPage, totalPages);

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous-page navigation. */}
                <PaginationItem>
                    <PaginationPrevious
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                </PaginationItem>

                {/* Render each page number or ellipsis. */}
                {pages.map((page, index) =>
                    page === "..." ? (
                        /* Render an ellipsis for hidden page ranges. */
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        /* Render an interactive link for each visible page. */
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => handlePageChange(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                {/* Next-page navigation. */}
                <PaginationItem>
                    <PaginationNext
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

ListPagination.propTypes = {
    // Currently selected page.
    currentPage: PropTypes.number.isRequired,

    // Total number of available pages.
    totalPages: PropTypes.number.isRequired,

    // Callback used to update the current page.
    onPageChange: PropTypes.func.isRequired,
};

export default ListPagination;
