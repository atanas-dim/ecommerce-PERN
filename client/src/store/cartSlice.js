import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCartProducts, fetchProductById } from "../api/api";

const updateTempCart = (data) => {
  localStorage.setItem("tempCartProducts", JSON.stringify(data));
};

const initialState = {
  tempCartProducts: [],
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
    addTempCartProduct: (state, action) => {
      const existingProductIndex = state.tempCartProducts.findIndex(
        (product) => {
          return (
            product?.product_id === action.payload.product_id &&
            product?.size === action.payload.size
          );
        }
      );

      if (existingProductIndex >= 0) {
        if (state.tempCartProducts[existingProductIndex].quantity < 10) {
          state.tempCartProducts[existingProductIndex].quantity +=
            action.payload.quantity;
        }
      } else {
        state.tempCartProducts.push(action.payload);
      }

      updateTempCart(state.tempCartProducts);
    },
    updateTempCartProduct: (state, action) => {
      const { tempCartProductIndex, quantity } = action.payload;
      state.tempCartProducts[tempCartProductIndex].quantity = quantity;

      updateTempCart(state.tempCartProducts);
    },
    deleteTempCartProduct: (state, action) => {
      const { tempCartProductIndex } = action.payload;
      const filteredTempCartProducts = state.tempCartProducts.filter(
        (product, index) => {
          if (index !== tempCartProductIndex) return product;
        }
      );

      state.tempCartProducts = filteredTempCartProducts;
      updateTempCart(state.tempCartProducts);
    },
    loadTempCartProducts: (state) => {
      state.tempCartProducts = JSON.parse(
        localStorage.getItem("tempCartProducts")
      );
    },
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

export const {
  loadTempCartProducts,
  addTempCartProduct,
  updateTempCartProduct,
  deleteTempCartProduct,
  clearCartProducts,
} = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectTempCartProducts = (state) => state.cart.tempCartProducts;

export default cartSlice.reducer;
