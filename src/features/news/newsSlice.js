import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

// Select the article fields and related tags and games needed by the news features.
const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

// Fetch a paginated list of news articles with optional search and tag filters.
export const fetchNewsList = createAsyncThunk(
    "news/fetchNewsList",
    async (
        { page = 1, pageSize = 5, search = "", tag = "all" } = {},
        { rejectWithValue },
    ) => {
        // Calculate the first and last database rows for the requested page.
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        // Determine whether a specific tag filter is active.
        const hasTagFilter = tag && tag !== "all";

        // Use an inner join when filtering by tag so only articles
        // associated with the selected tag are returned.
        let query = supabase
            .from("articles")
            .select(
                hasTagFilter
                    ? "*, article_tags!inner(tags!inner(*)), article_games(*)"
                    : NEWS_SELECT,
                { count: "exact" },
            )
            .eq("category", "news");

        // Filter articles by title when a search query is provided.
        if (search.trim()) {
            query = query.ilike("title", `%${search.trim()}%`);
        }

        // Filter articles by the selected tag slug.
        if (hasTagFilter) {
            query = query.eq("article_tags.tags.slug", tag);
        }

        // Sort by newest publication date and return only the requested page.
        const { data, error, count } = await query
            .order("published_at", { ascending: false })
            .range(from, to);

        // Return the database error through the rejected thunk action.
        if (error) return rejectWithValue(error.message);

        // Return both the articles and pagination information.
        return {
            articles: data,
            totalCount: count,
            page,
            pageSize,
        };
    },
);

// Fetch the latest articles marked as featured.
export const fetchFeaturedNews = createAsyncThunk(
    "news/fetchFeaturedNews",
    async (_, { rejectWithValue }) => {
        // Fetch up to three featured articles ordered by publication date.
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("is_featured", true)
            .order("published_at", { ascending: false })
            .limit(3);

        // Return the database error through the rejected thunk action.
        if (error) return rejectWithValue(error.message);

        // Return the featured articles.
        return data;
    },
);

// Fetch the latest news articles for sections such as carousels.
export const fetchLatestNews = createAsyncThunk(
    "news/fetchLatestNews",
    async (limit = 5, { rejectWithValue }) => {
        // Fetch the newest news articles up to the requested limit.
        const { data: articles, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "news")
            .order("published_at", { ascending: false })
            .limit(limit);

        // Return the database error through the rejected thunk action.
        if (error) return rejectWithValue(error.message);

        // Return the latest articles.
        return articles;
    },
);

// Fetch a single news or trending article using its slug.
export const fetchNewsBySlug = createAsyncThunk(
    "news/fetchNewsBySlug",
    async (slug, { rejectWithValue }) => {
        // Fetch the article matching the requested slug from either
        // the regular news or trending category.
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .in("category", ["news", "trending"])
            .eq("slug", slug)
            .single();

        // Return the database error through the rejected thunk action.
        if (error) return rejectWithValue(error.message);

        // Return the requested article.
        return data;
    },
);

// Store the news data and request state used throughout the application.
const initialState = {
    // Featured articles displayed in the featured news section.
    featuredNews: [],

    // Request state for featured articles.
    featuredNewsStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"

    // Error returned while fetching featured articles.
    featuredNewsError: null,

    // Latest articles used by latest-news sections and carousels.
    latestNews: [],

    // Request state for latest articles.
    latestNewsStatus: "idle",

    // Error returned while fetching latest articles.
    latestNewsError: null,

    // Currently opened article on the article detail page.
    currentArticle: null,

    // Request state for the current article.
    currentArticleStatus: "idle",

    // Error returned while fetching the current article.
    currentArticleError: null,

    // Articles displayed in the paginated news archive.
    newsList: [],

    // Request state for the news archive.
    newsListStatus: "idle",

    // Error returned while fetching the news archive.
    newsListError: null,

    // Total number of articles matching the current filters.
    newsListTotal: 0,

    // Currently selected archive page.
    newsListPage: 1,

    // Number of articles displayed on each archive page.
    newsListPageSize: 5,

    // Active filters used by the news archive.
    newsListFilters: {
        search: "",
        tag: "all",
    },
};

// Create the Redux slice responsible for news-related state.
const newsSlice = createSlice({
    name: "news",
    initialState,

    reducers: {
        // Clear the currently selected article when leaving the detail page.
        clearCurrentArticle(state) {
            state.currentArticle = null;
            state.currentArticleStatus = "idle";
            state.currentArticleError = null;
        },

        // Update the archive search query and return to the first page.
        setNewsSearch: (state, action) => {
            state.newsListFilters.search = action.payload;
            state.newsListPage = 1;
        },

        // Update the archive tag filter and return to the first page.
        setNewsTag: (state, action) => {
            state.newsListFilters.tag = action.payload;
            state.newsListPage = 1;
        },

        // Update the currently selected archive page.
        setNewsPage: (state, action) => {
            state.newsListPage = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // Mark the news list request as loading and clear its previous error.
            .addCase(fetchNewsList.pending, (state) => {
                state.newsListStatus = "loading";
                state.newsListError = null;
            })

            // Store the fetched news list and its pagination information.
            .addCase(fetchNewsList.fulfilled, (state, action) => {
                state.newsListStatus = "succeeded";
                state.newsList = action.payload.articles;
                state.newsListTotal = action.payload.totalCount;
                state.newsListPage = action.payload.page;
                state.newsListPageSize = action.payload.pageSize;
            })

            // Store the error when fetching the news list fails.
            .addCase(fetchNewsList.rejected, (state, action) => {
                state.newsListStatus = "failed";
                state.newsListError = action.payload;
            })

            // Mark the featured news request as loading and clear its previous error.
            .addCase(fetchFeaturedNews.pending, (state) => {
                state.featuredNewsStatus = "loading";
                state.featuredNewsError = null;
            })

            // Store the fetched featured articles.
            .addCase(fetchFeaturedNews.fulfilled, (state, action) => {
                state.featuredNewsStatus = "succeeded";
                state.featuredNews = action.payload;
            })

            // Store the error when fetching featured articles fails.
            .addCase(fetchFeaturedNews.rejected, (state, action) => {
                state.featuredNewsStatus = "failed";
                state.featuredNewsError = action.payload;
            })

            // Mark the latest news request as loading and clear its previous error.
            .addCase(fetchLatestNews.pending, (state) => {
                state.latestNewsStatus = "loading";
                state.latestNewsError = null;
            })

            // Store the fetched latest articles.
            .addCase(fetchLatestNews.fulfilled, (state, action) => {
                state.latestNewsStatus = "succeeded";
                state.latestNews = action.payload;
            })

            // Store the error when fetching latest articles fails.
            .addCase(fetchLatestNews.rejected, (state, action) => {
                state.latestNewsStatus = "failed";
                state.latestNewsError = action.payload;
            })

            // Mark the current article request as loading and clear its previous error.
            .addCase(fetchNewsBySlug.pending, (state) => {
                state.currentArticleStatus = "loading";
                state.currentArticleError = null;
            })

            // Store the fetched article as the current article.
            .addCase(fetchNewsBySlug.fulfilled, (state, action) => {
                state.currentArticleStatus = "succeeded";
                state.currentArticle = action.payload;
            })

            // Store the error when fetching the current article fails.
            .addCase(fetchNewsBySlug.rejected, (state, action) => {
                state.currentArticleStatus = "failed";
                state.currentArticleError = action.payload;
            });
    },
});

// Export the actions used to manage the news archive and current article.
export const { clearCurrentArticle, setNewsSearch, setNewsTag, setNewsPage } =
    newsSlice.actions;

// Export the news reducer for the Redux store.
export default newsSlice.reducer;
