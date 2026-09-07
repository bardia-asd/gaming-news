import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "@/features/news/newsSlice";
import trendingReducer from "@/features/trending/trendingSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";

const store = configureStore({
    reducer: {
        news: newsReducer,
        trending: trendingReducer,
        reviews: reviewsReducer,
    },
});

export default store;
