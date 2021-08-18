import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../../api/api";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  "user/fetchUser",
  async (loginData) => {
    const { email, password } = loginData;
    console.log(password);
    const response = await fetchUser(email, password);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        console.log("rejected");
        state.isLoading = false;
      });
  },
});

export const { clearUser } = userSlice.actions;

export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
