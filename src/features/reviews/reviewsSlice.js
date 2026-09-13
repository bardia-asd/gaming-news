import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

const NEWS_SELECT = "*, article_tags(tags(*)), article_games(*)";

export const SCORE_BUCKETS = {
    all: { min: 0, max: 10 },
    high: { min: 8.5, max: 10 },
    mid: { min: 6.5, max: 8.4 },
    low: { min: 0, max: 6.4 },
};

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (
        { page = 1, pageSize = 5, search = "", scoreBucket = "all" } = {},
        { rejectWithValue },
    ) => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
            .from("articles")
            .select(NEWS_SELECT, { count: "exact" })
            .eq("category", "review");

        if (search.trim()) {
            query = query.ilike("title", `%${search.trim()}%`);
        }

        const { min, max } = SCORE_BUCKETS[scoreBucket] ?? SCORE_BUCKETS.all;
        if (scoreBucket !== "all") {
            query = query.gte("review_score", min).lte("review_score", max);
        }

        const { data, error, count } = await query
            .order("published_at", { ascending: false })
            .range(from, to);

        if (error) {
            return rejectWithValue(error.message);
        }

        return {
            reviews: data,
            totalCount: count,
            page,
            pageSize,
        };
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
    reviewsTotal: 0,
    reviewsPage: 1,
    reviewsPageSize: 5,
    reviewsFilter: {
        search: "",
        scoreBucket: "all",
    },

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

        setReviewsSearch: (state, action) => {
            state.reviewsFilter.search = action.payload;
            state.reviewsPage = 1;
        },

        setReviewsScoreBucket(state, action) {
            state.reviewsFilter.scoreBucket = action.payload;
            state.reviewsPage = 1;
        },

        setReviewsPage: (state, action) => {
            state.reviewsPage = action.payload;
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
                state.reviews = action.payload.reviews;
                state.reviewsTotal = action.payload.totalCount;
                state.reviewsPage = action.payload.page;
                state.reviewsPageSize = action.payload.pageSize;
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

export const {
    clearCurrentReview,
    setReviewsSearch,
    setReviewsScoreBucket,
    setReviewsPage,
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
