import { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";

import {
    selectFeaturedNews,
    selectFeaturedNewsStatus,
} from "@/features/news/newsSelectors";
import { fetchFeaturedNews } from "@/features/news/newsSlice";

import { formatArticleDate } from "@/utils/formatter";
import TagBadge from "@/components/articles/TagBadge";
import FeaturedNewsSkeleton from "./FeaturedNewsSkeleton";

const FeaturedNews = () => {
    // Retrieve the featured news data and its request state from Redux.
    const featuredNews = useSelector(selectFeaturedNews);
    const status = useSelector(selectFeaturedNewsStatus);

    const dispatch = useDispatch();

    // Fetch the three featured news articles when the component mounts.
    useEffect(() => {
        dispatch(fetchFeaturedNews());
    }, [dispatch]);

    // Display the skeleton while the featured news is being fetched.
    if (status === "idle" || status === "loading")
        return <FeaturedNewsSkeleton />;

    return (
        <section>
            <div className="container mx-auto px-4 sm:px-6 py-12">
                {/* Display the first article as the featured story alongside two secondary stories. */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Featured article. */}
                    <div className="relative min-h-96 lg:min-h-112 rounded-2xl overflow-hidden lg:col-span-2">
                        <Link
                            to={`/news/${featuredNews[0]?.slug}`}
                            className="group block size-full">
                            <img
                                src={featuredNews[0]?.cover_image_url}
                                alt={featuredNews[0]?.title}
                                className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                <div className="flex items-center gap-2">
                                    {featuredNews[0]?.article_tags.map(
                                        ({ tags }) => (
                                            <TagBadge
                                                key={tags.id}
                                                tag={tags}
                                            />
                                        ),
                                    )}
                                </div>

                                <h1 className="text-white text-2xl lg:text-4xl line-clamp-2 font-medium">
                                    {featuredNews[0]?.title}
                                </h1>

                                <p className="text-slate-200 line-clamp-2 max-w-lg">
                                    {featuredNews[0]?.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                    <span>{featuredNews[0]?.author}</span>
                                    <span>•</span>
                                    <span>
                                        {formatArticleDate(
                                            featuredNews[0]?.published_at,
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
                                to={`/news/${featuredNews[1]?.slug}`}
                                className="group block size-full">
                                <img
                                    src={featuredNews[1]?.cover_image_url}
                                    alt={featuredNews[1]?.title}
                                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                    <h2 className="text-white line-clamp-2 font-medium">
                                        {featuredNews[1]?.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                        <span>
                                            {formatArticleDate(
                                                featuredNews[1]?.published_at,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="relative min-h-50 rounded-2xl overflow-hidden">
                            <Link
                                to={`/news/${featuredNews[2]?.slug}`}
                                className="group block size-full">
                                <img
                                    src={featuredNews[2]?.cover_image_url}
                                    alt={featuredNews[2]?.title}
                                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                    <h2 className="text-white line-clamp-2 font-medium">
                                        {featuredNews[2]?.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                        <span>
                                            {formatArticleDate(
                                                featuredNews[2]?.published_at,
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

export default FeaturedNews;
