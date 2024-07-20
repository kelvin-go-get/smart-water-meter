import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMeters = createAsyncThunk("meters/fetchMeters", async () => {
  const response = await axios.get("/meters");
  return response.data;
});
const meterSlice = createSlice({
  name: "meters",
  initialState: {
    meters: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meters = action.payload; // Ensure this is an array of meters
      })
      .addCase(fetchMeters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default meterSlice.reducer;
