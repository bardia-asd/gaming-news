import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

export const fetchLatestNews = createAsyncThunk(
    "news/fetchLatestNews",
    async (limit = 5, { rejectWithValue }) => {
        let { data: articles, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "news")
            .order("published_at", { ascending: false })
            .limit(limit);

        if (error) return rejectWithValue(error.message);

        return articles;
    },
);

const initialState = {
    latestNews: [],
    latestNewsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    latestNewsError: null,
};

const newsSlice = createSlice({
    name: "news",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default newsSlice.reducer;
