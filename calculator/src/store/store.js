import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ratesReducer from "./slices/ratesSlice";

const rootReducer = combineReducers({
  ratesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
