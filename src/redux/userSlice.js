import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("welyncuser") 
    ? JSON.parse(localStorage.getItem("welyncuser"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;

      // Store user data locally (but not tokens)
      localStorage.setItem("welyncuser", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;

      // Clear user info from localStorage
      localStorage.removeItem("welyncuser");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
