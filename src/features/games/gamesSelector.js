export const selectGames = (state) => state.games.games;
export const selectGamesStatus = (state) => state.games.gamesStatus;
export const selectGamesError = (state) => state.games.gamesError;
export const selectGamesTotal = (state) => state.games.gamesTotal;
export const selectGamesPage = (state) => state.games.gamesPage;
export const selectGamesPageSize = (state) => state.games.gamesPageSize;
export const selectGamesFilters = (state) => state.games.gamesFilters;

export const selectUpcomingGames = (state) => state.games.upcomingGames;
export const selectUpcomingGamesStatus = (state) =>
    state.games.upcomingGamesStatus;
export const selectUpcomingGamesError = (state) =>
    state.games.upcomingGamesError;

export const selectCurrentGame = (state) => state.games.currentGame;
export const selectCurrentGameStatus = (state) => state.games.currentGameStatus;
export const selectCurrentGameError = (state) => state.games.currentGameError;

export const selectTags = (state) => state.games.tags;
export const selectTagsStatus = (state) => state.games.tagsStatus;
export const selectTagsError = (state) => state.games.tagsError;
