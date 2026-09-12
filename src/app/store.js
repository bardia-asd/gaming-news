import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "@/features/news/newsSlice";
import trendingReducer from "@/features/trending/trendingSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";
import gamesReducer from "@/features/games/gamesSlice";
import savedReducer from "@/features/saved/savedSlice";

const store = configureStore({
    reducer: {
        news: newsReducer,
        trending: trendingReducer,
        reviews: reviewsReducer,
        games: gamesReducer,
        saved: savedReducer,
    },
});

export default store;
