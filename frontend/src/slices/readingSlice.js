import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReadings = createAsyncThunk(
  "readings/fetchReadings",
  async () => {
    const response = await axios.get("/api/readings");
    return response.data;
  }
);

const readingSlice = createSlice({
  name: "readings",
  initialState: {
    readings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReadings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.readings = action.payload;
      })
      .addCase(fetchReadings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default readingSlice.reducer;
