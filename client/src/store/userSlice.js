import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../api/api";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData) => {
    const { email, password } = loginData;
    try {
      const response = await fetchUser(email, password);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);

        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setUser, setIsLoggedIn, logoutUser } = userSlice.actions;

export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectError = (state) => state.user.error;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
