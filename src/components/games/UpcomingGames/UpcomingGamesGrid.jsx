import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectUpcomingGames,
    selectUpcomingGamesError,
    selectUpcomingGamesStatus,
} from "@/features/games/gamesSelector";
import { fetchUpcomingGames } from "@/features/games/gamesSlice";

import GameCard, { GameCardSkeleton } from "../GameCard";

// Render a responsive grid of upcoming games with loading and error states.
const UpcomingGamesGrid = () => {
    // Retrieve the upcoming games data from Redux.
    const upcomingGames = useSelector(selectUpcomingGames);

    // Retrieve the current request status from Redux.
    const status = useSelector(selectUpcomingGamesStatus);

    // Retrieve the request error from Redux.
    const error = useSelector(selectUpcomingGamesError);

    const dispatch = useDispatch();

    // Fetch upcoming games when the component mounts.
    // The date range limits the results to games releasing between
    // October 7 and December 31, 2026.
    useEffect(() => {
        dispatch(
            fetchUpcomingGames({
                startDate: "2026-10-07",
                endDate: "2026-12-31",
            }),
        );
    }, [dispatch]);

    // Show skeleton cards while the initial request is loading.
    if (status === "loading" || status === "idle") {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* Render placeholder cards while game data is unavailable. */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <GameCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Show the API error message when fetching the games fails.
    if (status === "failed") {
        return (
            <div className="flex min-h-40 items-center justify-center rounded-xl border border-border">
                {/* Display the API error or a fallback message. */}
                <p className="text-sm text-muted-foreground">
                    {error || "Failed to load upcoming games."}
                </p>
            </div>
        );
    }

    // Render the fetched games in a responsive grid.
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* Create one game card for each returned game. */}
            {upcomingGames?.results?.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};

export default UpcomingGamesGrid;
