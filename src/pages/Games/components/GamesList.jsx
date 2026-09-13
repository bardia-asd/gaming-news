import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import { fetchGames, setGamesPage } from "@/features/games/gamesSlice";
import {
    selectGames,
    selectGamesError,
    selectGamesFilters,
    selectGamesPage,
    selectGamesPageSize,
    selectGamesStatus,
    selectGamesTotal,
} from "@/features/games/gamesSelector";

import GameCard, { GameCardSkeleton } from "@/components/games/GameCard";
import ListPagination from "@/components/articles/ListPagination";

// Render the paginated games archive with search and tag filtering.
const GamesList = () => {
    // Retrieve the games data, request state, pagination, and active filters from Redux.
    const games = useSelector(selectGames);
    const status = useSelector(selectGamesStatus);
    const error = useSelector(selectGamesError);
    const totalCount = useSelector(selectGamesTotal);
    const page = useSelector(selectGamesPage);
    const pageSize = useSelector(selectGamesPageSize);
    const { search, tag } = useSelector(selectGamesFilters);

    const [, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    // Fetch games whenever the current page or filters change.
    useEffect(() => {
        dispatch(fetchGames({ page, pageSize, search, tag }));
    }, [dispatch, page, pageSize, search, tag]);

    // Keep the URL synchronized with the current search, tag, and page.
    // Replace the current URL so filter changes don't create extra history entries.
    useEffect(() => {
        const params = {};

        if (search) params.q = search;
        if (tag !== "all") params.tag = tag;
        if (page) params.page = page;

        setSearchParams(params, { replace: true });
    }, [search, tag, page, setSearchParams]);

    // Calculate the total number of pages from the API result count.
    const totalPages = Math.ceil(totalCount / pageSize);

    // Show skeleton cards while the initial games request is loading.
    if (status === "loading" || status === "idle") {
        return (
            <section>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Array.from({ length: pageSize }).map((_, index) => (
                            <GameCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Show an error state when the games request fails.
    if (status === "failed") {
        return (
            <section>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <h2 className="text-xl font-semibold">
                            Couldn't load games
                        </h2>

                        <p className="text-sm text-muted-foreground mt-2 max-w-md">
                            {error ||
                                "Something went wrong while loading the games."}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Show an empty state when no games match the current filters.
    if (games.length === 0) {
        return (
            <section>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <h2 className="text-xl font-semibold">
                            No games found
                        </h2>

                        <p className="text-sm text-muted-foreground mt-2 max-w-md">
                            Try changing your search or selecting a different
                            tag.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Render the current page of games and show pagination when multiple pages exist.
    return (
        <section>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                <div className="flex flex-col gap-8">
                    {/* Display the games in a responsive grid. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {games.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>

                    {/* Show pagination only when there is more than one page. */}
                    {totalPages > 1 && (
                        <ListPagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(p) => dispatch(setGamesPage(p))}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default GamesList;
