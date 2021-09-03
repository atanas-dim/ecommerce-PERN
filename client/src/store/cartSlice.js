import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  fetchCartProducts,
  fetchAddCartProduct,
  fetchDeleteCartProduct,
  fetchUpdateCartProduct,
  fetchCheckoutCart,
} from "../api/api";

const initialState = {
  cartProducts: [],
  isLoading: false,
  error: false,
  newOrderInfo: null,
  refreshCart: false,
};

export const loadCartProducts = createAsyncThunk(
  "cart/loadCartProducts",
  async (_, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user?.isLoggedIn;
    const cartId = thunkAPI.getState().user?.user?.cart_id;

    if (isLoggedIn) return await fetchCartProducts(cartId);
    return null;
  }
);

export const addCartProduct = createAsyncThunk(
  "cart/addCartProduct",
  async (product, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user?.isLoggedIn;
    const cartId = thunkAPI.getState().user?.user?.cart_id;

    if (isLoggedIn && cartId) {
      await fetchAddCartProduct({
        ...product,
        cart_id: cartId,
      });
    }
    return product;
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (product, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user?.isLoggedIn;
    const cartId = thunkAPI.getState().user?.user?.cart_id;

    if (isLoggedIn) {
      await fetchDeleteCartProduct({ ...product, cart_id: cartId });
    }
    return product;
  }
);

export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async (product, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user?.isLoggedIn;
    const cartId = thunkAPI.getState().user?.user?.cart_id;

    if (isLoggedIn)
      await fetchUpdateCartProduct({
        ...product,
        cart_id: cartId,
      });
    return product;
  }
);

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (products, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user?.isLoggedIn;
    const cartId = thunkAPI.getState().user?.user?.cart_id;

    products.forEach(async (product) => {
      if (isLoggedIn) {
        return await fetchAddCartProduct({
          ...product,
          cart_id: cartId,
        });
      }
    });
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (_, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user?.isLoggedIn;
    const cartId = thunkAPI.getState().user?.user?.cart_id;

    if (isLoggedIn) return await fetchCheckoutCart(cartId);
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setRefreshCart: (state, action) => {
      state.refreshCart = action.payload;
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
    clearNewOrderInfo: (state) => {
      state.newOrderInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartProducts.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(loadCartProducts.fulfilled, (state, action) => {
        if (action.payload !== null) state.cartProducts = action.payload;

        state.refreshCart = false;
        state.isLoading = false;
      })
      .addCase(loadCartProducts.rejected, (state) => {
        state.refreshCart = false;
        state.error = true;
        state.isLoading = false;
      })
      .addCase(addCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addCartProduct.fulfilled, (state, action) => {
        const data = action.payload;

        const productIndex = current(state.cartProducts).findIndex(
          (product) => {
            return (
              product.product_id === Number(data.product_id) &&
              product.size === data.size
            );
          }
        );

        if (productIndex > -1) {
          state.cartProducts[productIndex].quantity += data.quantity;
        } else {
          state.cartProducts.push(action.payload);
        }
        state.refreshCart = true;
        state.isLoading = false;
      })
      .addCase(addCartProduct.rejected, (state) => {
        state.refreshCart = false;
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
        state.refreshCart = true;
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.rejected, (state) => {
        state.refreshCart = false;
        state.error = true;
        state.isLoading = false;
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
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
        state.refreshCart = true;
        state.isLoading = false;
      })
      .addCase(updateCartProduct.rejected, (state) => {
        state.refreshCart = false;
        state.error = true;
        state.isLoading = false;
      })

      .addCase(checkoutCart.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.newOrderInfo = action.payload;
        state.cartProducts = [];
        state.refreshCart = true;
        state.isLoading = false;
      })
      .addCase(checkoutCart.rejected, (state) => {
        state.refreshCart = false;
        state.error = true;
        state.isLoading = false;
      })

      .addCase(syncCart.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(syncCart.fulfilled, (state) => {
        state.refreshCart = true;
        state.isLoading = false;
      })
      .addCase(syncCart.rejected, (state) => {
        state.refreshCart = false;
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { setCartId, clearCart, clearNewOrderInfo, setRefreshCart } =
  cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartId = (state) => state.cart.cartId;
export const selectAddedProductToCartStatus = (state) =>
  state.cart.addedProductToCartStatus;
export const selectNewOrderInfo = (state) => state.cart.newOrderInfo;
export const selectRefreshCart = (state) => state.cart.refreshCart;

export default cartSlice.reducer;
