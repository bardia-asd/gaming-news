import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectSavedNews,
    selectSavedNewsError,
    selectSavedNewsStatus,
} from "@/features/saved/savedSelectors";
import { fetchSavedArticles } from "@/features/saved/savedSlice";

import { Skeleton } from "@/components/ui/skeleton";

import NewsCard, { NewsCardSkeleton } from "@/components/news/NewsCard";

import SavedNewsError from "./SavedNewsError";
import SavedNewsEmpty from "./SavedNewsEmpty";

// Render the user's saved news articles with loading, error, and empty states.
const SavedNewsGrid = () => {
    // Retrieve the saved news articles from Redux.
    const savedNews = useSelector(selectSavedNews);

    // Retrieve the current request status from Redux.
    const status = useSelector(selectSavedNewsStatus);

    // Retrieve the request error from Redux.
    const error = useSelector(selectSavedNewsError);

    const dispatch = useDispatch();

    // Fetch the user's saved articles when the component mounts.
    useEffect(() => {
        dispatch(fetchSavedArticles());
    }, [dispatch]);

    // Show skeleton placeholders while the saved articles are loading.
    if (status === "loading" || status === "idle") {
        return (
            <div className="container max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-18">
                {/* Placeholder for the saved article count. */}
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

    // Show the error state when fetching saved articles fails.
    if (status === "failed") {
        return <SavedNewsError error={error} />;
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-18">
            {/* Display the number of saved articles currently available. */}
            <span className="text-primary tracking-widest uppercase text-[10px] font-bold">
                showing {savedNews.length}
            </span>

            {/* Render the saved articles in a responsive grid. */}
            {savedNews.length === 0 ? (
                <SavedNewsEmpty />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {savedNews.map((news) => (
                        <NewsCard key={news.id} article={news} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedNewsGrid;
