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

const initialState = {
    games: [],
    gamesStatus: "idle",
    gamesError: null,

    upcomingGames: [],
    upcomingGamesStatus: "idle",
    upcomingGamesError: null,
};

const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {},
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
            });
    },
});

export default gamesSlice.reducer;
