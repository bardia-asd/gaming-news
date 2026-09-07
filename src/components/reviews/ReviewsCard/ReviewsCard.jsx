import { Link } from "react-router";
import PropTypes from "prop-types";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import ScoreBadge from "./ScoreBadge";

// Render a review card with its cover image, score, title, excerpt, and author.
const ReviewsCard = ({ review }) => {
    return (
        <article>
            <Link to={`/reviews/${review.slug}`}>
                <Card className="overflow-hidden">
                    <div className="relative aspect-16/10">
                        <img
                            src={review.cover_image_url}
                            alt={review.title}
                            className="size-full object-cover"
                        />

                        {/* Display the review score over the cover image. */}
                        <div className="absolute top-4 right-4">
                            <ScoreBadge score={review.review_score} />
                        </div>
                    </div>

                    <CardContent className="p-5 flex flex-col gap-2">
                        <CardTitle className="font-normal line-clamp-1">
                            {review.title}
                        </CardTitle>

                        <CardDescription className="line-clamp-3 h-16">
                            {review.excerpt}
                        </CardDescription>

                        <span className="text-xs text-muted-foreground">
                            Reviewed by {review.author}
                        </span>
                    </CardContent>
                </Card>
            </Link>
        </article>
    );
};

ReviewsCard.propTypes = {
    review: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        cover_image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        review_score: PropTypes.number.isRequired,
        excerpt: PropTypes.string,
        author: PropTypes.string.isRequired,
    }).isRequired,
};

export default ReviewsCard;
