import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBalances = createAsyncThunk(
  "balances/fetchBalances",
  async () => {
    const response = await axios.get("/api/balances");
    return response.data;
  }
);

const balanceSlice = createSlice({
  name: "balances",
  initialState: {
    balances: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalances.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balances = action.payload;
      })
      .addCase(fetchBalances.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default balanceSlice.reducer;
