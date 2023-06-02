import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  access_token: "",
  expires_at: 0,
  email: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.expires_at = action.payload.expiry_date;
    },
    logout: (state) => {
      state.access_token = "";
      state.user_id = "";
      localStorage.clear();
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
