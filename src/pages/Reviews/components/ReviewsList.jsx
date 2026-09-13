import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import { fetchReviews, setReviewsPage } from "@/features/reviews/reviewsSlice";
import {
    selectReviews,
    selectReviewsError,
    selectReviewsFilter,
    selectReviewsPage,
    selectReviewsPageSize,
    selectReviewsStatus,
    selectReviewsTotal,
} from "@/features/reviews/reviewsSelectors";

import ReviewsCard, {
    ReviewsCardSkeleton,
} from "@/components/reviews/ReviewsCard";
import ListPagination from "@/components/articles/ListPagination";

// Render the paginated reviews archive with search and score filtering.
const ReviewsList = () => {
    // Get the URL parameter setter, Redux dispatcher, and reviews state.
    const [, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const reviews = useSelector(selectReviews);
    const status = useSelector(selectReviewsStatus);
    const error = useSelector(selectReviewsError);
    const totalCount = useSelector(selectReviewsTotal);
    const page = useSelector(selectReviewsPage);
    const pageSize = useSelector(selectReviewsPageSize);

    // Retrieve the active search and score filters from Redux.
    const { search, scoreBucket } = useSelector(selectReviewsFilter);

    // Fetch reviews whenever the current page or filters change.
    useEffect(() => {
        dispatch(fetchReviews({ page, pageSize, search, scoreBucket }));
    }, [dispatch, page, search, scoreBucket, pageSize]);

    // Keep the URL synchronized with the current filters and page
    // so the current review list can be shared or revisited.
    useEffect(() => {
        const params = {};

        if (search) params.q = search;
        if (scoreBucket !== "all") params.score = scoreBucket;
        if (page) params.page = page;

        setSearchParams(params, { replace: true });
    }, [search, page, scoreBucket, setSearchParams]);

    // Calculate the total number of pages from the result count.
    const totalPages = Math.ceil(totalCount / pageSize);

    // Show skeleton cards while the initial request is loading.
    if (status === "loading" || status === "idle") {
        return (
            <section className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: pageSize }).map((_, index) => (
                        <ReviewsCardSkeleton key={index} />
                    ))}
                </div>
            </section>
        );
    }

    // Show an error state when the reviews request fails.
    if (status === "failed") {
        return (
            <section className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <h2 className="text-xl font-semibold">
                        Couldn't load reviews
                    </h2>

                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                        {error || "Something went wrong while loading reviews."}
                    </p>
                </div>
            </section>
        );
    }

    // Show an empty state when no reviews match the current filters.
    if (reviews.length === 0) {
        return (
            <section className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <h2 className="text-xl font-semibold">No reviews found</h2>

                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                        Try changing your search or selecting a different score
                        range.
                    </p>
                </div>
            </section>
        );
    }

    // Render the current page of reviews with pagination controls.
    return (
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {reviews.map((review) => (
                        <ReviewsCard key={review.id} review={review} />
                    ))}
                </div>

                {/* Allow the user to navigate between review pages. */}
                <ListPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => dispatch(setReviewsPage(p))}
                />
            </div>
        </section>
    );
};

export default ReviewsList;
