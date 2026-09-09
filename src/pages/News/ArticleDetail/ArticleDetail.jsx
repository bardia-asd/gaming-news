import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Share2 } from "lucide-react";

import {
    selectCurrentArticle,
    selectCurrentArticleStatus,
    selectCurrentArticleError,
} from "@/features/news/newsSelectors";
import {
    clearCurrentArticle,
    fetchNewsBySlug,
} from "@/features/news/newsSlice";

import {
    Breadcrumbs,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { formatArticleDate } from "@/utils/formatter";
import { getInitials } from "@/utils/utils";

import ArticleDetailSkeleton from "./ArticleDetailSkeleton";
import ArticleNotFound from "./ArticleNotFound";
import { toast } from "sonner";

// Render the article detail page and handle its loading, error, and cleanup states.
const ArticleDetail = () => {
    const { articleId: slug } = useParams();

    const article = useSelector(selectCurrentArticle);
    const status = useSelector(selectCurrentArticleStatus);
    const error = useSelector(selectCurrentArticleError);

    const dispatch = useDispatch();

    // Fetch the article whenever the URL slug changes.
    // Clear the current article when leaving the page or switching to another article.
    useEffect(() => {
        dispatch(fetchNewsBySlug(slug));

        return () => dispatch(clearCurrentArticle());
    }, [slug, dispatch]);

    // Copy the current article URL to the user's clipboard.
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Article link copied");
        } catch {
            toast.error("Could not copy article link");
        }
    };

    // Show the loading state while the article is being fetched.
    if (status === "loading") {
        return <ArticleDetailSkeleton />;
    }

    // Show the not-found state when the request fails.
    if (status === "failed") {
        return <ArticleNotFound error={error} />;
    }

    // Prevent rendering the article content before the data is available.
    if (!article) return null;

    return (
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-12">
            {/* Article navigation breadcrumbs. */}
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

                    {/* Separate the homepage from the news section. */}
                    <BreadcrumbsSeparator />

                    {/* Link back to the news listing. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsLink
                            href="/news"
                            className="hover:text-primary">
                            News
                        </BreadcrumbsLink>
                    </BreadcrumbsItem>

                    {/* Separate the news listing from the current article. */}
                    <BreadcrumbsSeparator />

                    {/* Display the current article as the final breadcrumb. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsPage>{article.title}</BreadcrumbsPage>
                    </BreadcrumbsItem>
                </BreadcrumbsList>
            </Breadcrumbs>

            {/* Article header containing the title, excerpt, and cover image. */}
            <div className="flex flex-col gap-4 mb-6">
                {/* Article title. */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                    {article.title}
                </h1>

                {/* Short summary of the article. */}
                <p className="text-muted-foreground">{article.excerpt}</p>

                {/* Article cover image. */}
                <div className="aspect-video rounded-2xl overflow-hidden mb-5">
                    <img
                        src={article.cover_image_url}
                        alt={article.title}
                        loading="lazy"
                        className="size-full object-cover"
                    />
                </div>
            </div>

            {/* Article metadata and sharing controls. */}
            <div className="flex items-center justify-between border-y border-border py-4 mb-6">
                {/* Author information. */}
                <div className="flex items-center gap-3">
                    {/* Author avatar using their initials as the fallback. */}
                    <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {getInitials(article.author)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Author name and publication date. */}
                    <div className="flex flex-col">
                        <strong className="text-sm">{article.author}</strong>

                        <span className="text-xs text-muted-foreground">
                            Published {formatArticleDate(article.published_at)}
                        </span>
                    </div>
                </div>

                {/* Article sharing controls. */}
                <div className="flex items-center gap-3 text-muted-foreground text-xs">
                    {/* Label for the sharing action. */}
                    <span className="uppercase tracking-widest">share</span>

                    {/* Copy the current article URL when clicked. */}
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={handleCopyLink}
                        aria-label="Copy article link">
                        {/* Share icon representing the copy/share action. */}
                        <Share2 size={18} />
                    </Button>
                </div>
            </div>

            {/* Main article content. */}
            <p className="leading-7 text-secondary-foreground">
                {article.body}
            </p>
        </div>
    );
};

export default ArticleDetail;
