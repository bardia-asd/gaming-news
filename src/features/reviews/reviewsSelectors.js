export const selectReviews = (state) => state.reviews.reviews;
export const selectReviewsStatus = (state) => state.reviews.reviewsStatus;
export const selectReviewsError = (state) => state.reviews.reviewsError;
export const selectReviewsTotal = (state) => state.reviews.reviewsTotal;
export const selectReviewsPage = (state) => state.reviews.reviewsPage;
export const selectReviewsPageSize = (state) => state.reviews.reviewsPageSize;
export const selectReviewsFilter = (state) => state.reviews.reviewsFilter;

export const selectLatestReviews = (state) => state.reviews.latestReviews;
export const selectLatestReviewsStatus = (state) =>
    state.reviews.latestReviewsStatus;
export const selectLatestReviewsError = (state) =>
    state.reviews.latestReviewsError;

export const selectCurrentReview = (state) => state.reviews.currentReview;
export const selectCurrentReviewStatus = (state) =>
    state.reviews.currentReviewStatus;
export const selectCurrentReviewError = (state) =>
    state.reviews.currentReviewError;
