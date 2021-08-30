import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCartProducts } from "../api/api";

const initialState = {
  cartProducts: [],
  isLoading: false,
  error: false,
};

export const loadCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (cart_id) => {
    const response = await fetchCartProducts(cart_id);
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartProducts: (state) => {
      state.cartProducts = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCartProducts.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(loadCartProducts.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(loadCartProducts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { clearCartProducts } = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const selectCartProducts = (state) => state.cart.cartProducts;

export default cartSlice.reducer;
