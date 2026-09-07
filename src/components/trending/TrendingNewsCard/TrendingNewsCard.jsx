import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TagBadge from "@/components/articles/TagBadge";
import { formatArticleDate } from "@/utils/formatter";

const TrendingNewsCard = ({ news, index }) => {
    // Render a ranked news card with its position, tags, image, and publication date.
    return (
        <Link to={`/news/${news.slug}`}>
            <Card className="group hover:bg-primary-soft/10 hover:border-primary-border transition-colors">
                <CardContent className="flex items-center gap-4 p-4">
                    {/* Display the article's position as a two-digit number. */}
                    <span className="text-primary text-lg font-bold">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="shrink-0 rounded-lg overflow-hidden w-24 h-auto aspect-16/10">
                        <img
                            src={news.cover_image_url}
                            alt={news.title}
                            loading="lazy"
                            className="size-full object-cover"
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                            {news.article_tags.map(({ tags }) => (
                                <TagBadge key={tags.id} tag={tags} />
                            ))}
                        </div>

                        <CardTitle className="tracking-tight font-normal line-clamp-1">
                            {news.title}
                        </CardTitle>

                        <span className="text-xs text-muted-foreground">
                            {formatArticleDate(news.published_at)}
                        </span>
                    </div>

                    <span className="group-hover:text-primary transition-colors">
                        <ArrowUpRight size={18} />
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
};

TrendingNewsCard.propTypes = {
    news: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        cover_image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        published_at: PropTypes.string.isRequired,
        article_tags: PropTypes.arrayOf(
            PropTypes.shape({
                tags: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired,
        ).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default TrendingNewsCard;
