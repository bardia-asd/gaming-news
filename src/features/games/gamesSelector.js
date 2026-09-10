export const selectUpcomingGames = (state) => state.games.upcomingGames;
export const selectUpcomingGamesStatus = (state) =>
    state.games.upcomingGamesStatus;
export const selectUpcomingGamesError = (state) =>
    state.games.upcomingGamesError;

export const selectCurrentGame = (state) => state.games.currentGame;
export const selectCurrentGameStatus = (state) => state.games.currentGameStatus;
export const selectCurrentGameError = (state) => state.games.currentGameError;
