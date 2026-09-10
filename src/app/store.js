import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "@/features/news/newsSlice";
import trendingReducer from "@/features/trending/trendingSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";
import gamesReducer from "@/features/games/gamesSlice";

const store = configureStore({
    reducer: {
        news: newsReducer,
        trending: trendingReducer,
        reviews: reviewsReducer,
        games: gamesReducer,
    },
});

export default store;
