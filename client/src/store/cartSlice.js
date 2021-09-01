import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCartProducts,
  fetchAddCartProduct,
  fetchDeleteCartProduct,
  fetchUpdateCartProduct,
} from "../api/api";

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

export const addCartProduct = createAsyncThunk(
  "cart/postCartProduct",
  async (data) => {
    const response = await fetchAddCartProduct(data);
    return response;
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/removeCartProduct",
  async (data) => {
    const response = await fetchDeleteCartProduct(data);
    return response;
  }
);

export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async (data) => {
    const response = await fetchUpdateCartProduct(data);
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTempCartProduct: (state, action) => {
      console.log(action.payload);
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
        (product, index) => index !== tempCartProductIndex
      );

      state.tempCartProducts = filteredTempCartProducts;
      updateTempCart(state.tempCartProducts);
    },
    loadTempCartProducts: (state) => {
      state.tempCartProducts = JSON.parse(
        localStorage.getItem("tempCartProducts")
      );
    },
    clearTempCartProducts: (state) => {
      state.tempCartProducts = [];
      updateTempCart([]);
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
        console.log("loaded cart products");
        state.cartProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(loadCartProducts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      // Delete cart product
      .addCase(deleteCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        console.log(action.payload.config.data);
        // state.cartProducts = state.cartProducts.filter(product => product.)
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      // Update cart product
      .addCase(updateCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(updateCartProduct.rejected, (state) => {
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
  clearTempCartProducts,
  clearCartProducts,
} = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectTempCartProducts = (state) => state.cart.tempCartProducts;

export default cartSlice.reducer;
