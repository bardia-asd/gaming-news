export const formatArticleDate = (date) => {
    if (!date) return "";

    const articleDate = new Date(date);

    if (Number.isNaN(articleDate.getTime())) return "";

    const now = new Date();

    const diffInSeconds = Math.floor((now - articleDate) / 1000);
    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(articleDate);
};

export const formatGameReleaseDate = (date) => {
    if (!date) return "";

    const gameDate = new Date(date);

    if (Number.isNaN(gameDate.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(gameDate);
};
