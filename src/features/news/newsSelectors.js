// Select the paginated list of news articles.
export const selectNewsList = (state) => state.news.newsList;

// Select the current request status of the news list.
export const selectNewsListStatus = (state) => state.news.newsListStatus;

// Select the error returned when fetching the news list fails.
export const selectNewsListError = (state) => state.news.newsListError;

// Select the total number of articles matching the current filters.
export const selectNewsListTotal = (state) => state.news.newsListTotal;

// Select the currently active news archive page.
export const selectNewsListPage = (state) => state.news.newsListPage;

// Select the number of articles displayed per archive page.
export const selectNewsListPageSize = (state) => state.news.newsListPageSize;

// Select the currently active search and tag filters.
export const selectNewsListFilters = (state) => state.news.newsListFilters;

// Select the articles currently marked as featured.
export const selectFeaturedNews = (state) => state.news.featuredNews;

// Select the current request status of the featured news.
export const selectFeaturedNewsStatus = (state) =>
    state.news.featuredNewsStatus;

// Select the error returned when fetching featured news fails.
export const selectFeaturedNewsError = (state) => state.news.featuredNewsError;

// Select the latest news articles.
export const selectLatestNews = (state) => state.news.latestNews;

// Select the current request status of the latest news.
export const selectLatestNewsStatus = (state) => state.news.latestNewsStatus;

// Select the error returned when fetching latest news fails.
export const selectLatestNewsError = (state) => state.news.latestNewsError;

// Select the article currently displayed on the article detail page.
export const selectCurrentArticle = (state) => state.news.currentArticle;

// Select the current request status of the article detail request.
export const selectCurrentArticleStatus = (state) =>
    state.news.currentArticleStatus;

// Select the error returned when fetching the current article fails.
export const selectCurrentArticleError = (state) =>
    state.news.currentArticleError;
