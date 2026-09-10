import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rawgKey, rawgUrl } from "@/services/rawgService";

export const fetchUpcomingGames = createAsyncThunk(
    "games/fetchUpcomingGames",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${rawgUrl}/games?key=${rawgKey}&dates=${startDate},${endDate}&page_size=8`,
            );

            if (!res.ok) {
                return rejectWithValue("Failed to fetch upcoming games");
            }

            const data = await res.json();

            return data;
        } catch (error) {
            return rejectWithValue(
                error.message || "Failed to fetch upcoming games",
            );
        }
    },
);

export const fetchGameBySlug = createAsyncThunk(
    "games/fetchGameBySlug",
    async (slug, { rejectWithValue }) => {
        try {
            const res = await fetch(`${rawgUrl}/games/${slug}?key=${rawgKey}`);

            if (!res.ok) {
                return rejectWithValue("Failed to fetch game by slug");
            }

            const data = await res.json();

            return data;
        } catch (error) {
            return rejectWithValue(
                error.message || "Failed to fetch game by slug",
            );
        }
    },
);

const initialState = {
    games: [],
    gamesStatus: "idle",
    gamesError: null,

    upcomingGames: [],
    upcomingGamesStatus: "idle",
    upcomingGamesError: null,

    currentGame: null,
    currentGameStatus: "idle",
    currentGameError: null,
};

const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        clearCurrentGame(state) {
            state.currentGame = null;
            state.currentGameStatus = "idle";
            state.currentGameError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcomingGames.pending, (state) => {
                state.upcomingGamesStatus = "loading";
                state.upcomingGamesError = null;
            })
            .addCase(fetchUpcomingGames.fulfilled, (state, action) => {
                state.upcomingGamesStatus = "succeeded";
                state.upcomingGames = action.payload;
            })
            .addCase(fetchUpcomingGames.rejected, (state, action) => {
                state.upcomingGamesStatus = "failed";
                state.upcomingGamesError = action.payload;
            })

            .addCase(fetchGameBySlug.pending, (state) => {
                state.currentGameStatus = "loading";
                state.currentGameError = null;
            })
            .addCase(fetchGameBySlug.fulfilled, (state, action) => {
                state.currentGameStatus = "succeeded";
                state.currentGame = action.payload;
            })
            .addCase(fetchGameBySlug.rejected, (state, action) => {
                state.currentGameStatus = "failed";
                state.currentGameError = action.payload;
            });
    },
});

export const { clearCurrentGame } = gamesSlice.actions;
export default gamesSlice.reducer;
