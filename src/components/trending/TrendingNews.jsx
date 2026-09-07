import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "@/components/SectionHeader";
import TrendingNewsCard from "./TrendingNewsCard";
import {
    selectTrendingNews,
    selectTrendingNewsStatus,
    selectTrendingNewsError,
} from "@/features/trending/trendingSelectors";
import { fetchTrendingNews } from "@/features/trending/trendingSlice";
import TrendingNewsCardSkeleton from "./TrendingNewsCard/TrendingNewsSkeleton";

// Render the trending news section with loading skeletons while data is being fetched.
const TrendingNews = () => {
    // Retrieve trending news data and its request state from Redux.
    const trendingNews = useSelector(selectTrendingNews);
    const status = useSelector(selectTrendingNewsStatus);
    const error = useSelector(selectTrendingNewsError);

    const dispatch = useDispatch();

    // Fetch trending news when the component mounts.
    useEffect(() => {
        dispatch(fetchTrendingNews());
    }, [dispatch]);

    // Show skeletons before the initial request completes.
    const isLoading = status === "idle" || status === "loading";

    return (
        <section className="bg-muted border-y border-border">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <SectionHeader title="Trending now" subtitle="the feed" />

                <div className="flex flex-col gap-3">
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, i) => (
                              <TrendingNewsCardSkeleton key={i} />
                          ))
                        : trendingNews.map((news, i) => (
                              <TrendingNewsCard
                                  key={news.id}
                                  news={news}
                                  index={i}
                              />
                          ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingNews;
