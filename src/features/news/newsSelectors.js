export const selectFeaturedNews = (state) => state.news.featuredNews;
export const selectFeaturedNewsStatus = (state) =>
    state.news.featuredNewsStatus;
export const selectFeaturedNewsError = (state) => state.news.featuredNewsError;

export const selectLatestNews = (state) => state.news.latestNews;
export const selectLatestNewsStatus = (state) => state.news.latestNewsStatus;
export const selectLatestNewsError = (state) => state.news.latestNewsError;

export const selectCurrentArticle = (state) => state.news.currentArticle;
export const selectCurrentArticleStatus = (state) =>
    state.news.currentArticleStatus;
export const selectCurrentArticleError = (state) =>
    state.news.currentArticleError;
