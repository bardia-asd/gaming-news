import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "@/features/news/newsSlice";
import trendingReducer from "@/features/trending/trendingSlice";

const store = configureStore({
    reducer: {
        news: newsReducer,
        trending: trendingReducer,
    },
});

export default store;
