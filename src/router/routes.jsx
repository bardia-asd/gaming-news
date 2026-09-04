import { createBrowserRouter } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import { News, ArticleDetail } from "@/pages/News";
import ReviewDetail from "@/pages/ReviewDetail";
import GameDetail from "@/pages/GameDetail";
import Saved from "@/pages/Saved";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "news",
                children: [
                    { index: true, element: <News /> },
                    { path: ":articleId", element: <ArticleDetail /> },
                ],
            },
            { path: "reviews/:reviewId", element: <ReviewDetail /> },
            { path: "games/:gameId", element: <GameDetail /> },
            { path: "saved", element: <Saved /> },
        ],
    },
]);
