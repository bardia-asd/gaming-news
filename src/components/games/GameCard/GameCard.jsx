import { Link } from "react-router";
import PropTypes from "prop-types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatGameReleaseDate } from "@/utils/formatter";

// Render a game card with its cover image, platforms, and release date.
const GameCard = ({ game }) => {
    return (
        <Link to={`/games/${game.slug}`}>
            <Card className="overflow-hidden hover:bg-primary-soft/10 hover:border-primary-border transition-colors h-full">
                {/* Display the game's cover image. */}
                <div className="aspect-16/10">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        loading="lazy"
                        className="size-full object-cover"
                    />
                </div>

                {/* Display the game's basic information. */}
                <CardContent className="flex flex-col gap-2 p-5">
                    {/* Game title. */}
                    <CardTitle className="line-clamp-1 font-normal">
                        {game.name}
                    </CardTitle>

                    {/* Display all available platforms separated by a slash. */}
                    <div className="flex items-center gap-2 min-h-4 text-xs text-muted-foreground">
                        <span>
                            {game?.platforms
                                ?.map(({ platform }) => platform.name)
                                .join(" / ")}
                        </span>
                    </div>

                    {/* Display the game's release date. */}
                    <span className="text-xs text-muted-foreground">
                        {formatGameReleaseDate(game.released)}
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
};

GameCard.propTypes = {
    game: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        background_image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        released: PropTypes.string.isRequired,
        platforms: PropTypes.arrayOf(
            PropTypes.shape({
                platform: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired,
        ),
    }).isRequired,
};

export default GameCard;
