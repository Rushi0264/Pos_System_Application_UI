import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../utils/storage";

const initialState = {
  token: storage.getToken(),
  user: storage.getUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.jwt;
      state.user = action.payload.user;

      storage.setToken(action.payload.jwt);
      storage.setUser(action.payload.user);
    },

    logout(state) {
      state.token = null;
      state.user = null;

      storage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;