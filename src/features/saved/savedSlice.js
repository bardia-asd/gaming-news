// Redux slice for managing saved article IDs and fetching their full article data.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { supabase } from "@/services/supabase";

// Local storage key used to persist saved article IDs between sessions.
const STORAGE_KEY = "savedArticleIds";

// Select the article fields and related data needed by saved news cards.
const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

// Load saved article IDs from localStorage.
export const loadSavedIds = () => {
    try {
        // Read the previously saved IDs from localStorage.
        const saved = localStorage.getItem(STORAGE_KEY);

        // Parse the stored JSON or return an empty array when nothing is saved.
        return saved ? JSON.parse(saved) : [];
    } catch {
        // Fall back to an empty list if localStorage or JSON parsing fails.
        return [];
    }
};

// Persist the current saved article IDs to localStorage.
export const persistSavedIds = (ids) => {
    try {
        // Store the IDs as a JSON string so they can be restored later.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {}
};

// Fetch the complete article data for all currently saved article IDs.
export const fetchSavedArticles = createAsyncThunk(
    "saved/fetchSavedArticles",
    async (_, { getState, rejectWithValue }) => {
        // Read the saved article IDs from the Redux state.
        const { savedIds } = getState().saved;

        // Avoid making a Supabase request when there are no saved articles.
        if (savedIds.length === 0) return [];

        // Fetch all saved articles and their related tags and games.
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .in("id", savedIds);

        // Return the Supabase error message when the request fails.
        if (error) return rejectWithValue(error.message);

        // Return the fetched articles to the fulfilled action.
        return data;
    },
);

// Create the Redux slice responsible for saved articles.
const savedSlice = createSlice({
    name: "saved",

    // Initialize saved IDs from localStorage and reset fetched articles
    // until they are loaded from Supabase.
    initialState: {
        savedIds: loadSavedIds(),
        savedNews: [],
        savedNewsStatus: "idle",
        savedNewsError: null,
    },

    reducers: {
        // Add or remove an article from the user's saved articles.
        toggleSaved: (state, action) => {
            // Get the article ID from the dispatched action.
            const newsId = action.payload;

            // Find the article ID's current position in the saved IDs array.
            const index = state.savedIds.indexOf(newsId);

            // Add the article when it isn't currently saved.
            if (index === -1) {
                state.savedIds.push(newsId);
            } else {
                // Remove the article ID when it is already saved.
                state.savedIds.splice(index, 1);

                // Remove the article from the currently loaded saved articles
                // so the UI updates immediately without another API request.
                state.savedNews = state.savedNews.filter(
                    (news) => news.id !== newsId,
                );
            }

            // Persist the updated saved IDs for future sessions.
            persistSavedIds(state.savedIds);
        },
    },

    extraReducers: (builder) => {
        builder
            // Mark the saved articles request as loading and clear old errors.
            .addCase(fetchSavedArticles.pending, (state) => {
                state.savedNewsStatus = "loading";
                state.savedNewsError = null;
            })

            // Store the fetched articles and mark the request as successful.
            .addCase(fetchSavedArticles.fulfilled, (state, action) => {
                state.savedNewsStatus = "succeeded";
                state.savedNews = action.payload;
            })

            // Store the request error when fetching saved articles fails.
            .addCase(fetchSavedArticles.rejected, (state, action) => {
                state.savedNewsStatus = "failed";
                state.savedNewsError = action.payload || action.error.message;
            });
    },
});

// Export the action used to add or remove saved articles.
export const { toggleSaved } = savedSlice.actions;

// Export the slice reducer for the Redux store.
export default savedSlice.reducer;
