import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

export const fetchSearchResults = createAsyncThunk(
    "search/fetchSearchResults",
    async (query, { rejectWithValue }) => {
        const trimmed = query.trim();

        if (!trimmed) return [];

        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "news")
            .textSearch("search_vector", trimmed, { type: "websearch" })
            .order("created_at", { ascending: false });

        if (error) return rejectWithValue(error.message);
        return data;
    },
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        results: [],
        resultsStatus: "idle",
        resultsError: null,
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSearchResults: (state) => {
            state.results = [];
            state.resultsStatus = "idle";
            state.resultsError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.resultsStatus = "loading";
                state.resultsError = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.resultsStatus = "succeeded";
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.resultsStatus = "failed";
                state.resultsError = action.payload || action.error.message;
            });
    },
});

export const { setSearchQuery, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
