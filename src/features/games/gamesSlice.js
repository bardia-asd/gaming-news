import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rawgKey, rawgUrl } from "@/services/rawgService";

// Fetch a paginated list of games with optional search and tag filters.
export const fetchGames = createAsyncThunk(
    "games/fetchGames",
    async (
        { page = 1, pageSize = 9, search = "", tag = "all" } = {},
        { rejectWithValue },
    ) => {
        try {
            // Build the RAWG query parameters and add filters when provided.
            const params = new URLSearchParams({
                key: rawgKey,
                page: String(page),
                page_size: String(pageSize),
            });

            if (search.trim()) params.set("search", search.trim());
            if (tag !== "all") params.set("tags", tag);

            // Fetch games ordered by recently added.
            const res = await fetch(
                `${rawgUrl}/games?${params.toString()}&ordering=-added`,
            );

            // Return a useful API error when the request fails.
            if (!res.ok) {
                const errorBody = await res.json().catch(() => null);

                return rejectWithValue(
                    errorBody?.detail || `Failed to fetch games: ${res.status}`,
                );
            }

            const data = await res.json();

            // Include pagination information so Redux can keep track of the
            // current page and page size alongside the API response.
            return { ...data, page, pageSize };
        } catch (error) {
            // Handle network or unexpected request errors.
            return rejectWithValue(error.message || "Failed to fetch games");
        }
    },
);

// Fetch games scheduled for release within the provided date range.
export const fetchUpcomingGames = createAsyncThunk(
    "games/fetchUpcomingGames",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            // Request games whose release dates fall within the selected range.
            const res = await fetch(
                `${rawgUrl}/games?key=${rawgKey}&dates=${startDate},${endDate}&page_size=8`,
            );

            // Return an error when the API request fails.
            if (!res.ok) {
                return rejectWithValue("Failed to fetch upcoming games");
            }

            const data = await res.json();

            return data;
        } catch (error) {
            // Handle network or unexpected request errors.
            return rejectWithValue(
                error.message || "Failed to fetch upcoming games",
            );
        }
    },
);

// Fetch detailed information for a single game by its slug.
export const fetchGameBySlug = createAsyncThunk(
    "games/fetchGameBySlug",
    async (slug, { rejectWithValue }) => {
        try {
            // Request the complete game details from RAWG.
            const res = await fetch(`${rawgUrl}/games/${slug}?key=${rawgKey}`);

            // Return an error when the requested game cannot be fetched.
            if (!res.ok) {
                return rejectWithValue("Failed to fetch game by slug");
            }

            const data = await res.json();

            return data;
        } catch (error) {
            // Handle network or unexpected request errors.
            return rejectWithValue(
                error.message || "Failed to fetch game by slug",
            );
        }
    },
);

// Fetch all available RAWG tags used by the games filter.
export const fetchTags = createAsyncThunk(
    "games/fetchTags",
    async (_, { rejectWithValue }) => {
        try {
            // Request the available game tags from RAWG.
            const res = await fetch(`${rawgUrl}/tags?key=${rawgKey}`);

            // Return the HTTP status details when the request fails.
            if (!res.ok) {
                return rejectWithValue(
                    `Failed to fetch tags: ${res.status} ${res.statusText}`,
                );
            }

            const data = await res.json();

            return data;
        } catch (error) {
            // Handle network or unexpected request errors.
            return rejectWithValue(
                error.message || "Something went wrong while fetching tags.",
            );
        }
    },
);

// Store game lists, filters, pagination, detail data, and request states.
const initialState = {
    games: [],
    gamesStatus: "idle",
    gamesError: null,
    gamesTotal: 0,
    gamesPage: 1,
    gamesPageSize: 9,

    // Store the active filters used by the games archive.
    gamesFilters: {
        search: "",
        tag: "all",
    },

    // Store games scheduled for upcoming release.
    upcomingGames: [],
    upcomingGamesStatus: "idle",
    upcomingGamesError: null,

    // Store the currently opened game on the detail page.
    currentGame: null,
    currentGameStatus: "idle",
    currentGameError: null,

    // Store the available tags used by the games filter.
    tags: [],
    tagsStatus: "idle",
    tagsError: null,
};

const gamesSlice = createSlice({
    name: "games",
    initialState,

    reducers: {
        // Clear the current game when leaving the game detail page.
        clearCurrentGame(state) {
            state.currentGame = null;
            state.currentGameStatus = "idle";
            state.currentGameError = null;
        },

        // Update the game search filter and return to the first page.
        setGamesSearch: (state, action) => {
            state.gamesFilters.search = action.payload;
            state.gamesPage = 1;
        },

        // Update the game tag filter and return to the first page.
        setGamesTag: (state, action) => {
            state.gamesFilters.tag = action.payload;
            state.gamesPage = 1;
        },

        // Update the currently selected games page.
        setGamesPage: (state, action) => {
            state.gamesPage = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // Handle the paginated games request lifecycle.
            .addCase(fetchGames.pending, (state) => {
                state.gamesStatus = "loading";
                state.gamesError = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.gamesStatus = "succeeded";
                state.games = action.payload.results;
                state.gamesTotal = action.payload.count;
                state.gamesPage = action.payload.page;
                state.gamesPageSize = action.payload.pageSize;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.gamesStatus = "failed";
                state.gamesError = action.payload || "Failed to fetch games";
            })

            // Handle the upcoming games request lifecycle.
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

            // Handle the current game detail request lifecycle.
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
            })

            // Handle the tags request lifecycle.
            .addCase(fetchTags.pending, (state) => {
                state.tagsStatus = "loading";
                state.tagsError = null;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tagsStatus = "succeeded";
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.tagsStatus = "failed";
                state.tagsError = action.payload || "Failed to fetch tags.";
            });
    },
});

// Export the actions used to manage game filters, pagination, and detail state.
export const { clearCurrentGame, setGamesSearch, setGamesTag, setGamesPage } =
    gamesSlice.actions;

// Export the games reducer for the Redux store.
export default gamesSlice.reducer;
