import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

// Add any other slices here as needed
import customerReducer from "./slices/customerSlice";
import meterReducer from "./slices/meterSlice";
import readingReducer from "./slices/readingSlice";
import balanceReducer from "./slices/balanceSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    meters: meterReducer,
    readings: readingReducer,
    balances: balanceReducer,
    payments: paymentReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
