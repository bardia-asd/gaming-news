import { createBrowserRouter } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import { News, ArticleDetail } from "@/pages/News";
import { Games, GameDetail } from "@/pages/Games";
import Saved from "@/pages/Saved";
import { Reviews, ReviewDetail } from "@/pages/Reviews";

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
            {
                path: "reviews",
                children: [
                    { index: true, element: <Reviews /> },
                    { path: ":reviewId", element: <ReviewDetail /> },
                ],
            },
            {
                path: "games",
                children: [
                    { index: true, element: <Games /> },
                    { path: ":gameId", element: <GameDetail /> },
                ],
            },
            { path: "saved", element: <Saved /> },
        ],
    },
]);
