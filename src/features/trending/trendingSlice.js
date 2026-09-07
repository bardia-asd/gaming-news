import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

// Select the article fields and related tags and games needed by trending news.
const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

export const fetchTrendingNews = createAsyncThunk(
    "trending/fetchTrendingNews",
    async (limit = 5, { rejectWithValue }) => {
        // Fetch the latest trending articles with their related tags and games.
        const { data: articles, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "trending")
            .order("published_at", { ascending: false })
            .limit(limit);

        if (error) {
            console.error("fetchTrendingNews:", error);

            // Pass the Supabase error message to the rejected action.
            return rejectWithValue(error.message);
        }

        return articles;
    },
);

const initialState = {
    trendingNews: [],
    trendingNewsStatus: "idle",
    trendingNewsError: null,
};

const trendingSlice = createSlice({
    name: "trending",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Reset the previous error when a new request starts.
            .addCase(fetchTrendingNews.pending, (state) => {
                state.trendingNewsStatus = "loading";
                state.trendingNewsError = null;
            })

            // Store the fetched articles and mark the request as successful.
            .addCase(fetchTrendingNews.fulfilled, (state, action) => {
                state.trendingNewsStatus = "succeeded";
                state.trendingNews = action.payload;
            })

            // Store the request error so the UI can display it if needed.
            .addCase(fetchTrendingNews.rejected, (state, action) => {
                console.error("Rejected action:", action);

                state.trendingNewsStatus = "failed";
                state.trendingNewsError =
                    action.payload || action.error.message;
            });
    },
});

export default trendingSlice.reducer;
