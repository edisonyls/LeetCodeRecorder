import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signInFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
  },
});

export const { signInStart, signInSuccess, signInFailed, logout } =
  userSlice.actions;

export default userSlice.reducer;
