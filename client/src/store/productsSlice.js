import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBestSellers,
  fetchProductsCategory,
  fetchProductById,
} from "../api/api";

const initialState = {
  products: [],
  productItem: null,
  isLoading: false,
};

export const loadBestSellers = createAsyncThunk(
  "products/loadBestSellers",
  async () => {
    const response = await fetchBestSellers();
    return response;
  }
);

export const loadProductsCategory = createAsyncThunk(
  "products/loadProductsCategory",
  async (category) => {
    const response = await fetchProductsCategory(category);
    return response;
  }
);

export const loadProductById = createAsyncThunk(
  "products/loadProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductItem: (state) => {
      state.productItem = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadBestSellers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadBestSellers.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(loadBestSellers.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loadProductsCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadProductsCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(loadProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loadProductById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.productItem = action.payload;
        state.isLoading = false;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        console.log("rejected");
        state.isLoading = false;
      });
  },
});

export const { clearProductItem } = productsSlice.actions;

export const selectIsLoading = (state) => state.products.isLoading;
export const selectProducts = (state) => state.products.products;
export const selectProductItem = (state) => state.products.productItem;

export default productsSlice.reducer;
