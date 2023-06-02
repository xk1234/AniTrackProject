import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  status: "",
  link: ""
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.link = action.payload.link;
    },
    hideMessage: (state, action) => {
      state.message = "";
      state.status = "";
      state.link = "";
    }
  }
});

// Action creators are generated for each case reducer function
export const { showMessage, hideMessage } = messageSlice.actions;

export default messageSlice.reducer;
