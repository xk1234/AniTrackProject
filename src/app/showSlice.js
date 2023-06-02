import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showinfo: {}
};

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    setShowInfo: (state, action) => {
      state.showinfo = action.payload.showinfo;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setShowInfo } = showSlice.actions;

export default showSlice.reducer;
