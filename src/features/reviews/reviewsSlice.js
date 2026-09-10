import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (limit = 8, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "review")
            .order("published_at", { ascending: false })
            .limit(limit);

        if (error) {
            console.error("fetchReviews:", error);
            return rejectWithValue(error.message);
        }
        return data;
    },
);

export const fetchLatestReviews = createAsyncThunk(
    "reviews/fetchLatestReviews",
    async (limit = 6, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "review")
            .order("published_at", { ascending: false })
            .limit(limit);

        if (error) {
            console.error("fetchLatestReviews:", error);
            return rejectWithValue(error.message);
        }
        return data;
    },
);

export const fetchReviewBySlug = createAsyncThunk(
    "reviews/fetchReviewBySlug",
    async (slug, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("articles")
            .select(NEWS_SELECT)
            .eq("category", "review")
            .eq("slug", slug)
            .single();

        if (error) return rejectWithValue(error.message);
        return data;
    },
);

const initialState = {
    reviews: [],
    reviewsStatus: "idle",
    reviewsError: null,

    latestReviews: [],
    latestReviewsStatus: "idle",
    latestReviewsError: null,

    currentReview: null,
    currentReviewStatus: "idle",
    currentReviewError: null,
};

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        clearCurrentReview(state) {
            state.currentReview = null;
            state.currentReviewStatus = "idle";
            state.currentReviewError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.reviewsStatus = "loading";
                state.reviewsError = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviewsStatus = "succeeded";
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.reviewsStatus = "failed";
                state.reviewsError = action.payload;
            })

            .addCase(fetchLatestReviews.pending, (state) => {
                state.latestReviewsStatus = "loading";
                state.latestReviewsError = null;
            })
            .addCase(fetchLatestReviews.fulfilled, (state, action) => {
                state.latestReviewsStatus = "succeeded";
                state.latestReviews = action.payload;
            })
            .addCase(fetchLatestReviews.rejected, (state, action) => {
                state.latestReviewsStatus = "failed";
                state.latestReviewsError = action.payload;
            })

            .addCase(fetchReviewBySlug.pending, (state) => {
                state.currentReviewStatus = "loading";
                state.currentReviewError = null;
            })
            .addCase(fetchReviewBySlug.fulfilled, (state, action) => {
                state.currentReviewStatus = "succeeded";
                state.currentReview = action.payload;
            })
            .addCase(fetchReviewBySlug.rejected, (state, action) => {
                state.currentReviewStatus = "failed";
                state.currentReviewError = action.payload;
            });
    },
});

export const { clearCurrentReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
