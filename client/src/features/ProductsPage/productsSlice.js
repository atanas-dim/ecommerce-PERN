import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBestSellers,
  fetchProductsCategory,
  fetchProductById,
} from "../../api/api";

const initialState = {
  products: [],
  productItem: {},
};

export const loadBestSellers = createAsyncThunk(
  "products/fetchBestSellers",
  async () => {
    const response = await fetchBestSellers();
    return response;
  }
);

export const loadProductsCategory = createAsyncThunk(
  "products/fetchProductsCategory",
  async (category) => {
    const response = await fetchProductsCategory(category);
    return response;
  }
);

export const loadProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadBestSellers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBestSellers.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(loadProductsCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.productItem = action.payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectProductItem = (state) => state.products.productItem;

export default productsSlice.reducer;
