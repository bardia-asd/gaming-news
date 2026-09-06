import { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";

import {
    selectLatestNews,
    selectLatestNewsError,
    selectLatestNewsStatus,
} from "@/features/news/newsSelectors";
import { fetchLatestNews } from "@/features/news/newsSlice";

import { formatArticleDate } from "@/utils/formatter";
import TagBadge from "@/components/articles/TagBadge";
import LatestNewsSkeleton from "./LatestNewsSkeleton";

const LatestNews = () => {
    // Retrieve the latest news data and its request state from Redux.
    const latestNews = useSelector(selectLatestNews);
    const status = useSelector(selectLatestNewsStatus);

    const dispatch = useDispatch();

    // Fetch the three most recent news articles when the component mounts.
    useEffect(() => {
        dispatch(fetchLatestNews(3));
    }, [dispatch]);

    // Display the skeleton while the latest news is being fetched.
    if (status === "idle" || status === "loading")
        return <LatestNewsSkeleton />;

    return (
        <section>
            <div className="container mx-auto px-4 sm:px-6 py-12">
                {/* Display the latest article as the featured story alongside two secondary stories. */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Featured article. */}
                    <div className="relative min-h-96 lg:min-h-112 rounded-2xl overflow-hidden lg:col-span-2">
                        <Link
                            to={`/news/${latestNews[0]?.slug}`}
                            className="group block size-full">
                            <img
                                src={latestNews[0]?.cover_image_url}
                                alt={latestNews[0]?.title}
                                className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                <div className="flex items-center gap-2">
                                    {latestNews[0]?.article_tags.map(
                                        ({ tags }) => (
                                            <TagBadge
                                                key={tags.id}
                                                tag={tags}
                                            />
                                        ),
                                    )}
                                </div>

                                <h1 className="text-white text-2xl lg:text-4xl line-clamp-2 font-medium">
                                    {latestNews[0]?.title}
                                </h1>

                                <p className="text-slate-200 line-clamp-2 max-w-lg">
                                    {latestNews[0]?.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                    <span>{latestNews[0]?.author}</span>
                                    <span>•</span>

                                    <span>
                                        {formatArticleDate(
                                            latestNews[0]?.published_at,
                                        )}
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 ml-auto text-primary font-bold">
                                        Read story
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Two secondary articles stacked beside the featured story. */}
                    <div className="grid grid-rows-2 gap-5">
                        <div className="relative min-h-50 rounded-2xl overflow-hidden">
                            <Link
                                to={`/news/${latestNews[1]?.slug}`}
                                className="group block size-full">
                                <img
                                    src={latestNews[1]?.cover_image_url}
                                    alt={latestNews[1]?.title}
                                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                    <h1 className="text-white line-clamp-2 font-medium">
                                        {latestNews[1]?.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                        <span>
                                            {formatArticleDate(
                                                latestNews[1]?.published_at,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="relative min-h-50 rounded-2xl overflow-hidden">
                            <Link
                                to={`/news/${latestNews[2]?.slug}`}
                                className="group block size-full">
                                <img
                                    src={latestNews[2]?.cover_image_url}
                                    alt={latestNews[2]?.title}
                                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                    <h1 className="text-white line-clamp-2 font-medium">
                                        {latestNews[2]?.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                        <span>
                                            {formatArticleDate(
                                                latestNews[2]?.published_at,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
