import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import {
    selectNewsList,
    selectNewsListFilters,
    selectNewsListPage,
    selectNewsListPageSize,
    selectNewsListTotal,
    selectNewsListStatus,
    selectNewsListError,
} from "@/features/news/newsSelectors";
import { fetchNewsList, setNewsPage } from "@/features/news/newsSlice";

import NewsCard, { NewsCardSkeleton } from "@/components/news/NewsCard";
import ListPagination from "@/components/articles/ListPagination";

// Render the paginated news archive with filtering, loading,
// error, empty, and pagination states.
const NewsList = () => {
    const newsList = useSelector(selectNewsList);
    const status = useSelector(selectNewsListStatus);
    const error = useSelector(selectNewsListError);
    const totalCount = useSelector(selectNewsListTotal);
    const page = useSelector(selectNewsListPage);
    const pageSize = useSelector(selectNewsListPageSize);
    const { search, tag } = useSelector(selectNewsListFilters);

    // Get the function used to update the URL query parameters.
    const [, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    // Fetch the news list whenever the page or filters change.
    useEffect(() => {
        dispatch(
            fetchNewsList({
                page,
                pageSize,
                search,
                tag,
            }),
        );
    }, [dispatch, page, pageSize, search, tag]);

    // Keep the URL query parameters synchronized with the Redux filters.
    // This makes the current search, tag, and page shareable through the URL.
    useEffect(() => {
        const params = {};

        // Add the search query only when a search value exists.
        if (search) params.q = search;

        // Add the tag only when a specific tag is selected.
        if (tag !== "all") params.tag = tag;

        // Add the current page to the URL.
        if (page) params.page = page;

        // Replace the current URL instead of adding a new browser history entry.
        setSearchParams(params, { replace: true });
    }, [search, page, tag, setSearchParams]);

    // Calculate the total number of pages from the total article count.
    const totalPages = Math.ceil(totalCount / pageSize);

    // Show skeleton cards while the initial request is loading.
    if (status === "loading" || status === "idle") {
        return (
            <section>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                    {/* Render one skeleton for each article slot on the current page. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Array.from({ length: pageSize }).map((_, index) => (
                            <NewsCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Show an error message when fetching the news list fails.
    if (status === "failed") {
        return (
            <section>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                    {/* Center the error message within the content area. */}
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        {/* Explain that the news request failed. */}
                        <h2 className="text-xl font-semibold">
                            Couldn't load news
                        </h2>

                        {/* Display the API error or a fallback message. */}
                        <p className="text-sm text-muted-foreground mt-2 max-w-md">
                            {error ||
                                "Something went wrong while loading the news."}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Show an empty state when the filters return no articles.
    if (newsList.length === 0) {
        return (
            <section>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                    {/* Center the empty-state message within the content area. */}
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        {/* Tell the user that no articles match the current filters. */}
                        <h2 className="text-xl font-semibold">No news found</h2>

                        {/* Suggest changing the current search or tag filter. */}
                        <p className="text-sm text-muted-foreground mt-2 max-w-md">
                            Try changing your search or selecting a different
                            tag.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-18">
                <div className="flex flex-col gap-8">
                    {/* Display the current page of news articles in a responsive grid. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {/* Render one news card for each article. */}
                        {newsList.map((news) => (
                            <NewsCard key={news.id} article={news} />
                        ))}
                    </div>

                    {/* Allow the user to navigate between available pages. */}
                    <ListPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(p) => dispatch(setNewsPage(p))}
                    />
                </div>
            </div>
        </section>
    );
};

export default NewsList;
