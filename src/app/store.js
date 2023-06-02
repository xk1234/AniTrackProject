import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import messageSlice from "./messageSlice";
import showSlice from "./showSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    message: messageSlice,
    show: showSlice
  }
});
