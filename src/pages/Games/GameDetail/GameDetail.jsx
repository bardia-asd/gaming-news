import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ArrowUpRight, CalendarDays, Monitor } from "lucide-react";

import {
    selectCurrentGame,
    selectCurrentGameError,
    selectCurrentGameStatus,
} from "@/features/games/gamesSelector";
import { clearCurrentGame, fetchGameBySlug } from "@/features/games/gamesSlice";

import {
    Breadcrumbs,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import GameDetailSkeleton from "./GameDetailSkeleton";
import GameNotFound from "./GameNotFound";

import { formatGameReleaseDate } from "@/utils/formatter";

// Render the game detail page with game information, metadata, and description.
const GameDetail = () => {
    // Get the game slug from the current URL.
    const { gameId: slug } = useParams();

    // Retrieve the current game and its request state from Redux.
    const game = useSelector(selectCurrentGame);
    const status = useSelector(selectCurrentGameStatus);
    const error = useSelector(selectCurrentGameError);

    const dispatch = useDispatch();

    // Fetch the game whenever the URL slug changes.
    // Clear the current game when leaving the page or switching to another game.
    useEffect(() => {
        dispatch(fetchGameBySlug(slug));

        return () => dispatch(clearCurrentGame());
    }, [dispatch, slug]);

    // Show the loading skeleton while the game is being fetched.
    if (status === "loading" || status === "idle") {
        return <GameDetailSkeleton />;
    }

    // Show the not-found state when the request fails.
    if (status === "failed") {
        return <GameNotFound error={error} />;
    }

    // Prevent rendering the page before the game data is available.
    if (!game) return null;

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {/* Navigation breadcrumbs for the current game. */}
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

                    {/* Separate the homepage from the games section. */}
                    <BreadcrumbsSeparator />

                    {/* Link back to the games listing. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsLink
                            href="/games"
                            className="hover:text-primary">
                            Games
                        </BreadcrumbsLink>
                    </BreadcrumbsItem>

                    {/* Separate the games listing from the current game. */}
                    <BreadcrumbsSeparator />

                    {/* Display the current game as the final breadcrumb. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsPage>{game.name}</BreadcrumbsPage>
                    </BreadcrumbsItem>
                </BreadcrumbsList>
            </Breadcrumbs>

            {/* Main game header containing the cover image and metadata. */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Game cover image with the title and genres overlaid. */}
                <div className="lg:col-span-2 relative min-h-105 rounded-2xl overflow-hidden h-full">
                    {/* Display the game's background image. */}
                    <img
                        src={game.background_image}
                        alt={game.name}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                    />

                    {/* Add a dark gradient to improve text readability. */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Position the game title and genres over the image. */}
                    <div className="relative z-10 flex flex-col justify-end gap-3 p-5 min-h-105 h-full">
                        {/* Game title. */}
                        <h1 className="text-white text-2xl lg:text-3xl">
                            {game.name}
                        </h1>

                        {/* Display the game's genres when available. */}
                        {game.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {/* Render one badge for each genre. */}
                                {game.genres.map((genre) => (
                                    <Badge
                                        key={genre.id}
                                        variant="outline"
                                        className="text-white/80 rounded-full">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Game metadata card. */}
                <Card>
                    <CardContent className="p-5 divide-y divide-border">
                        {/* Display the platforms the game is available on. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Platforms
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                <Monitor className="size-4 shrink-0" />

                                {/* Join all available platforms with a slash. */}
                                {game.platforms
                                    ?.map(({ platform }) => platform.name)
                                    .join(" / ")}
                            </span>
                        </div>

                        {/* Display the game's release date. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Release date
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                <CalendarDays className="size-4 shrink-0" />

                                {/* Format the raw API date for display. */}
                                {formatGameReleaseDate(game.released)}
                            </span>
                        </div>

                        {/* Display the game's Metacritic rating when available. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Rating
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                {/* Show the score out of 100 or a fallback when unavailable. */}
                                {game.metacritic
                                    ? `${game.metacritic}/100`
                                    : "Not yet rated"}
                            </span>
                        </div>

                        {/* Display the game's developers. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Developers
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                {/* Join multiple developers with commas. */}
                                {game.developers
                                    ?.map((dev) => dev.name)
                                    .join(", ")}
                            </span>
                        </div>

                        {/* Display the game's publishers. */}
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xs text-muted-foreground tracking-widest">
                                Publishers
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground">
                                {/* Join multiple publishers with commas. */}
                                {game.publishers
                                    ?.map((pub) => pub.name)
                                    .join(", ") || "N/A"}
                            </span>
                        </div>

                        {/* Show a link to the official game website when available. */}
                        {game.website && (
                            <div className="pt-5">
                                {/* Open the official website in a new browser tab. */}
                                <a
                                    href={game.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                                    Official website
                                    {/* Indicate that the link opens an external page. */}
                                    <ArrowUpRight className="size-4" />
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </section>

            {/* Display the game's description when one is available. */}
            {game.description_raw && (
                <section className="mt-8">
                    {/* Section heading for the game description. */}
                    <h2 className="text-xl font-semibold mb-3">
                        About the game
                    </h2>

                    {/* Render the raw game description from the API. */}
                    <p className="text-sm leading-7 text-muted-foreground">
                        {game.description_raw}
                    </p>
                </section>
            )}
        </div>
    );
};

export default GameDetail;
