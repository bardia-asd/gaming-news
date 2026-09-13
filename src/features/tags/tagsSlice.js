import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

export const fetchAllTags = createAsyncThunk(
    "tags/fetchAllTags",
    async (_, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("tags")
            .select("*")
            .order("name", { ascending: true });

        if (error) return rejectWithValue(error.message);

        return data;
    },
);

const initialState = {
    tags: [],
    tagsStatus: "idle",
    tagsError: null,
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTags.pending, (state) => {
                state.tagsStatus = "loading";
                state.tagsError = null;
            })
            .addCase(fetchAllTags.fulfilled, (state, action) => {
                state.tagsStatus = "succeeded";
                state.tags = action.payload;
            })
            .addCase(fetchAllTags.rejected, (state, action) => {
                state.tagsStatus = "failed";
                state.tagsError = action.payload;
            });
    },
});

export default tagsSlice.reducer;
