import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

export const fetchFeaturedNews = createAsyncThunk(
    "news/fetchFeaturedNews",
    async (_, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("is_featured", true)
            .order("published_at", { ascending: false })
            .limit(3);

        if (error) return rejectWithValue(error.message);

        return data;
    },
);

export const fetchLatestNews = createAsyncThunk(
    "news/fetchLatestNews",
    async (limit = 5, { rejectWithValue }) => {
        const { data: articles, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "news")
            .order("published_at", { ascending: false })
            .limit(limit);

        if (error) return rejectWithValue(error.message);

        return articles;
    },
);

export const fetchNewsBySlug = createAsyncThunk(
    "news/fetchNewsBySlug",
    async (slug, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .in("category", ["news", "trending"])
            .eq("slug", slug)
            .single();

        if (error) return rejectWithValue(error.message);

        return data;
    },
);

const initialState = {
    featuredNews: [],
    featuredNewsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    featuredNewsError: null,

    latestNews: [],
    latestNewsStatus: "idle",
    latestNewsError: null,

    currentArticle: null,
    currentArticleStatus: "idle",
    currentArticleError: null,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        clearCurrentArticle(state) {
            state.currentArticle = null;
            state.currentArticleStatus = "idle";
            state.currentArticleError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeaturedNews.pending, (state) => {
                state.featuredNewsStatus = "loading";
                state.featuredNewsError = null;
            })
            .addCase(fetchFeaturedNews.fulfilled, (state, action) => {
                state.featuredNewsStatus = "succeeded";
                state.featuredNews = action.payload;
            })
            .addCase(fetchFeaturedNews.rejected, (state, action) => {
                state.featuredNewsStatus = "failed";
                state.featuredNewsError = action.payload;
            })

            .addCase(fetchLatestNews.pending, (state) => {
                state.latestNewsStatus = "loading";
                state.latestNewsError = null;
            })
            .addCase(fetchLatestNews.fulfilled, (state, action) => {
                state.latestNewsStatus = "succeeded";
                state.latestNews = action.payload;
            })
            .addCase(fetchLatestNews.rejected, (state, action) => {
                state.latestNewsStatus = "failed";
                state.latestNewsError = action.payload;
            })

            .addCase(fetchNewsBySlug.pending, (state) => {
                state.currentArticleStatus = "loading";
                state.currentArticleError = null;
            })
            .addCase(fetchNewsBySlug.fulfilled, (state, action) => {
                state.currentArticleStatus = "succeeded";
                state.currentArticle = action.payload;
            })
            .addCase(fetchNewsBySlug.rejected, (state, action) => {
                state.currentArticleStatus = "failed";
                state.currentArticleError = action.payload;
            });
    },
});

export const { clearCurrentArticle } = newsSlice.actions;
export default newsSlice.reducer;
