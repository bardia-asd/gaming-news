import { Link } from "react-router";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark } from "lucide-react";

import { selectSavedNewsIds } from "@/features/saved/savedSelectors";
import { toggleSaved } from "@/features/saved/savedSlice";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import TagBadge from "@/components/articles/TagBadge";

import { formatArticleDate } from "@/utils/formatter";
import { cn } from "@/utils/utils";

const NewsCard = ({ article }) => {
    const dispatch = useDispatch();

    const savedNewsIds = useSelector(selectSavedNewsIds);
    const isSaved = savedNewsIds.includes(article.id);

    // Render a news article card with its image, tags, metadata, and save action.
    return (
        <article className="group relative">
            <Card className="h-full overflow-hidden hover:bg-primary-soft/10 hover:border-primary-border transition-colors">
                <Link to={`/news/${article.slug}`} className="block">
                    <div className="relative aspect-16/10 overflow-hidden">
                        <img
                            src={article.cover_image_url}
                            alt={article.title}
                            loading="lazy"
                            className="size-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                    </div>

                    <CardContent className="p-5 flex flex-col gap-2">
                        <div className="flex gap-2 mb-1">
                            {article.article_tags.map(({ tags }) => (
                                <TagBadge key={tags.id} tag={tags} />
                            ))}
                        </div>

                        <CardTitle className="font-normal line-clamp-1 group-hover:text-primary transition-colors">
                            {article.title}
                        </CardTitle>

                        <CardDescription className="line-clamp-2 text-muted-foreground text-sm">
                            {article.excerpt}
                        </CardDescription>

                        <span className="text-xs text-muted-foreground">
                            {formatArticleDate(article.published_at)}
                        </span>
                    </CardContent>
                </Link>

                {/* Save the article without navigating to its detail page. */}
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "absolute top-3 right-3 size-8 hover:bg-background",
                        isSaved && "text-primary",
                    )}
                    aria-label={isSaved ? "Remove from saved" : "Save article"}
                    onClick={() => dispatch(toggleSaved(article.id))}>
                    <Bookmark
                        size={18}
                        fill={isSaved ? "currentColor" : "none"}
                    />
                </Button>
            </Card>
        </article>
    );
};

NewsCard.propTypes = {
    article: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        cover_image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
        published_at: PropTypes.string.isRequired,
        article_tags: PropTypes.arrayOf(
            PropTypes.shape({
                tags: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired,
                }).isRequired,
            }),
        ),
    }).isRequired,
};

export default NewsCard;
