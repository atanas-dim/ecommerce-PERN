import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  fetchCartProducts,
  fetchAddCartProduct,
  fetchDeleteCartProduct,
  fetchUpdateCartProduct,
} from "../api/api";

const initialState = {
  cartProducts: [],
  isLoading: false,
  error: false,
  cartId: undefined,
};

export const loadCartProducts = createAsyncThunk(
  "cart/loadCartProducts",
  async (cart_id) => {
    console.log(cart_id);

    const response = await fetchCartProducts(cart_id);
    return response;
  }
);

export const addCartProduct = createAsyncThunk(
  "cart/addCartProduct",
  async (product, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user.isLoggedIn;
    const cartId = thunkAPI.getState().cart.cart_id;

    if (isLoggedIn && cartId)
      await fetchAddCartProduct({ ...product, cart_id: cartId });

    return product;
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (data, thunkAPI) => {
    const cartId = thunkAPI.getState().cart.cartId;
    const response = await fetchDeleteCartProduct({ ...data, cart_id: cartId });
    return response;
  }
);

export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async (data, thunkAPI) => {
    const cartId = thunkAPI.getState().cart.cartId;

    console.log(data);
    const response = await fetchUpdateCartProduct({ ...data, cart_id: cartId });
    return response;
  }
);

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (products, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user.isLoggedIn;
    const cartId = thunkAPI.getState().cart.cartId;

    products.forEach(async (product) => {
      if (isLoggedIn)
        await fetchAddCartProduct({ ...product, cart_id: cartId });
    });
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      console.log(action.payload);
      state.cartId = action.payload;
    },
    clearCart: (state) => {
      state.cartProducts = [];
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
        action.payload !== null
          ? (state.cartProducts = action.payload)
          : (state.cartProducts = []);
        state.isLoading = false;
      })
      .addCase(loadCartProducts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(addCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addCartProduct.fulfilled, (state, action) => {
        console.log("added cart product");

        state.cartProducts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addCartProduct.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        const data = action.payload;

        const indexToDelete = current(state.cartProducts).findIndex(
          (product) => {
            return (
              product.product_id === Number(data.product_id) &&
              product.size === data.size
            );
          }
        );

        if (indexToDelete > -1) {
          state.cartProducts.splice(indexToDelete, 1);
        }
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        console.log("updated cart products");
        const data = action.payload;

        const indexToUpdate = current(state.cartProducts).findIndex(
          (product) => {
            return (
              product.product_id === Number(data.product_id) &&
              product.size === data.size
            );
          }
        );

        state.cartProducts[indexToUpdate].quantity = data.quantity;
        state.isLoading = false;
      })
      .addCase(updateCartProduct.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { setCartId, clearCart } = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartId = (state) => state.cart.cartId;

export default cartSlice.reducer;
