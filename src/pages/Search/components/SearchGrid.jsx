import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
    selectSearchResults,
    selectSearchResultsError,
    selectSearchResultsStatus,
} from "@/features/search/searchSelectors";
import { useEffect } from "react";
import {
    clearSearchResults,
    fetchSearchResults,
} from "@/features/search/searchSlice";

import NewsCard, { NewsCardSkeleton } from "@/components/news/NewsCard";

import { Skeleton } from "@/components/ui/skeleton";

import SearchError from "./SearchError";
import SearchEmpty from "./SearchEmpty";

// Render search results with loading, error, and empty states.
const SearchGrid = () => {
    // Read the search query from the current URL.
    const [searchParams] = useSearchParams();

    // Get the value of the "q" query parameter.
    const urlQuery = searchParams.get("q");

    // Retrieve search results and their request state from Redux.
    const searchResult = useSelector(selectSearchResults);
    const status = useSelector(selectSearchResultsStatus);
    const error = useSelector(selectSearchResultsError);

    const dispatch = useDispatch();

    // Fetch search results whenever the URL search query changes.
    // Clear the previous results when leaving the page or starting a new search.
    useEffect(() => {
        dispatch(fetchSearchResults(urlQuery));

        return () => dispatch(clearSearchResults());
    }, [dispatch, urlQuery]);

    // Show skeleton placeholders while the search request is loading.
    if (status === "loading" || status === "idle") {
        return (
            <div className="container max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-18">
                {/* Placeholder for the number of search results. */}
                <Skeleton className="h-3 w-20" />

                {/* Display placeholder cards while the request is pending. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <NewsCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    // Show the error state when the search request fails.
    if (status === "failed") {
        return <SearchError error={error} />;
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-18">
            {/* Display the number of articles matching the search query. */}
            <span className="text-primary tracking-widest uppercase text-[10px] font-bold">
                {searchResult.length} found
            </span>

            {/* Show the empty state when no articles match the search query. */}
            {searchResult.length === 0 ? (
                <SearchEmpty />
            ) : (
                /* Display the matching articles in a responsive grid. */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {/* Render one news card for each search result. */}
                    {searchResult.map((result) => (
                        <NewsCard key={result.id} article={result} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchGrid;
