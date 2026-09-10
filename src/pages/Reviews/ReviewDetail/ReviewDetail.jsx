import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, Monitor, ThumbsDown, ThumbsUp } from "lucide-react";

import {
    selectCurrentReview,
    selectCurrentReviewError,
    selectCurrentReviewStatus,
} from "@/features/reviews/reviewsSelectors";
import {
    clearCurrentReview,
    fetchReviewBySlug,
} from "@/features/reviews/reviewsSlice";

import {
    Breadcrumbs,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

import SectionHeader from "@/components/SectionHeader";

import { cn } from "@/utils/utils";
import { formatArticleDate } from "@/utils/formatter";
import { getScoreStyle } from "@/components/reviews/utils/scoreStyle";
import ReviewDetailSkeleton from "./ReviewDetailSkeleton";
import ReviewNotFound from "./ReviewNotFound";

// Render the review detail page with review information, rating, overview, and pros and cons.
const ReviewDetail = () => {
    // Get the review slug from the current URL.
    const { reviewId: slug } = useParams();

    // Retrieve the current review and its request state from Redux.
    const review = useSelector(selectCurrentReview);
    const status = useSelector(selectCurrentReviewStatus);
    const error = useSelector(selectCurrentReviewError);

    const dispatch = useDispatch();

    // Fetch the review whenever the URL slug changes.
    // Clear the current review when leaving the page or switching to another review.
    useEffect(() => {
        dispatch(fetchReviewBySlug(slug));

        return () => dispatch(clearCurrentReview());
    }, [slug, dispatch]);

    // Show the loading skeleton while the review is being fetched.
    if (status === "loading") {
        return <ReviewDetailSkeleton />;
    }

    // Show the not-found state when the review request fails.
    if (status === "failed") {
        return <ReviewNotFound error={error} />;
    }

    // Prevent rendering the page before the review data is available.
    if (!review) return null;

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {/* Navigation breadcrumbs for the current review. */}
            <Breadcrumbs>
                <BreadcrumbsList className="mb-5">
                    {/* Link back to the homepage. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsLink
                            href="/"
                            className="hover:text-primary">
                            Home
                        </BreadcrumbsLink>
                    </BreadcrumbsItem>

                    {/* Separate the homepage from the reviews section. */}
                    <BreadcrumbsSeparator />

                    {/* Link back to the reviews listing. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsLink
                            href="/reviews"
                            className="hover:text-primary">
                            Reviews
                        </BreadcrumbsLink>
                    </BreadcrumbsItem>

                    {/* Separate the reviews listing from the current review. */}
                    <BreadcrumbsSeparator />

                    {/* Display the current game as the final breadcrumb. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsPage>{review.game_name}</BreadcrumbsPage>
                    </BreadcrumbsItem>
                </BreadcrumbsList>
            </Breadcrumbs>

            {/* Main review header containing the cover image and review metadata. */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Review cover image and game title. */}
                <div className="lg:col-span-2 relative min-h-105 rounded-2xl overflow-hidden">
                    {/* Display the game's cover image as the section background. */}
                    <img
                        src={review.cover_image_url}
                        alt={review.game_name}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                    />

                    {/* Add a gradient overlay to improve title readability. */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Position the game title over the cover image. */}
                    <div className="relative z-10 flex flex-col justify-end gap-3 p-5 min-h-105">
                        <h1 className="text-white text-2xl lg:text-3xl">
                            {review.game_name}
                        </h1>
                    </div>
                </div>

                {/* Review metadata and rating card. */}
                <Card>
                    <CardContent className="p-5 divide-y divide-border">
                        {/* Display the platforms the game is available on. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Platforms
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                <Monitor className="size-4 shrink-0" />
                                {review.platforms?.join(" / ") || "N/A"}
                            </span>
                        </div>

                        {/* Display the game's release date. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Release date
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                <CalendarDays className="size-4 shrink-0" />
                                {formatArticleDate(review.published_at)}
                            </span>
                        </div>

                        {/* Display the review author. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Author
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                {review.author}
                            </span>
                        </div>

                        {/* Display the review score with its corresponding style. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Rating
                            </span>

                            <div
                                className={cn(
                                    "p-3 rounded-xl text-center font-bold text-2xl",
                                    getScoreStyle(review.review_score),
                                )}>
                                {review.review_score}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Review overview containing the title and main review content. */}
            <section className="my-6 space-y-4">
                {/* Display the review heading, title, and body. */}
                <div className="flex flex-col gap-3">
                    {/* Section label describing the review overview. */}
                    <span className="text-primary tracking-widest uppercase text-[10px] font-bold">
                        the overview
                    </span>

                    {/* Review title. */}
                    <h2 className="text-lg font-medium">{review.title}</h2>

                    {/* Main review body. */}
                    <p className="text-secondary-foreground">{review.body}</p>
                </div>

                {/* Highlight the final score and editorial verdict. */}
                <Card>
                    <CardContent className="p-4 flex flex-col gap-2">
                        {/* Label for the editorial score. */}
                        <span>Our take</span>

                        {/* Display the review score out of ten. */}
                        <strong>{review.review_score}/10</strong>

                        {/* Display the editorial verdict. */}
                        <span className="text-xs">Critically acclaimed</span>
                    </CardContent>
                </Card>
            </section>

            {/* Review pros and cons breakdown. */}
            <section>
                <SectionHeader title="Pros & cons" subtitle="the breakdown" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Positive aspects of the reviewed game. */}
                    <Card>
                        <CardContent className="flex flex-col gap-3 p-5 border-t-2 border-success rounded-xl">
                            {/* Pros section heading. */}
                            <div className="flex items-center gap-2">
                                <ThumbsUp className="size-4 text-success" />
                                <h3>What works</h3>
                            </div>

                            {/* List of positive aspects. */}
                            <ul className="flex flex-col gap-2">
                                {review.review_pros?.map((pros) => (
                                    <li
                                        key={pros}
                                        className="inline-flex items-center gap-1.5">
                                        {/* Positive indicator for each pro. */}
                                        <span className="text-success">+</span>

                                        {pros}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Negative aspects of the reviewed game. */}
                    <Card>
                        <CardContent className="flex flex-col gap-3 p-5 border-t-2 border-destructive rounded-xl">
                            {/* Cons section heading. */}
                            <div className="flex items-center gap-2">
                                <ThumbsDown className="size-4 text-destructive" />
                                <h3>What doesn't</h3>
                            </div>

                            {/* List of negative aspects. */}
                            <ul className="flex flex-col gap-2">
                                {review.review_cons?.map((cons) => (
                                    <li
                                        key={cons}
                                        className="inline-flex items-center gap-1.5">
                                        {/* Negative indicator for each con. */}
                                        <span className="text-destructive">
                                            -
                                        </span>

                                        {cons}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ReviewDetail;
