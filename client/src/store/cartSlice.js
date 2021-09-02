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
    const response = await fetchCartProducts(cart_id);
    return response;
  }
);

export const addCartProduct = createAsyncThunk(
  "cart/addCartProduct",
  async (product, thunkAPI) => {
    const isLoggedIn = thunkAPI.getState().user.isLoggedIn;
    if (isLoggedIn) await fetchAddCartProduct(product);

    return product;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (products) => {
    console.log(products);
    products.forEach(async (product) => {
      console.log(product);
      await fetchUpdateCartProduct(product);
    });
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addCartProduct: (state, action) => {
    //   const data = action.payload;
    //   const existingProductIndex = state.cartProducts?.findIndex((product) => {
    //     return product.id === data.id && product.size === data.size;
    //   });

    //   if (existingProductIndex >= 0) {
    //     if (state.cartProducts[existingProductIndex].quantity < 10) {
    //       state.cartProducts[existingProductIndex].quantity += data.quantity;
    //     }
    //   } else {
    //     state.cartProducts.push(data);
    //   }
    // },
    updateCartProduct: (state, action) => {
      const data = action.payload;
      state.cartProducts.forEach((product, index) => {
        if (product.id === data.id && product.size === data.size) {
          product.quantity = data.quantity;
        }
      });
    },
    deleteCartProduct: (state, action) => {
      console.log(action.payload);
      const data = action.payload;

      const indexToDelete = state.cartProducts.findIndex((product) => {
        return product.id === data.id && product.size === data.size;
      });

      if (indexToDelete > -1) {
        state.cartProducts.splice(indexToDelete, 1);
      }
    },
    setCartId: (state, action) => {
      console.log(action.payload);
      state.cartId = action.payload;
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
        console.log("loaded cart products");

        state.cartProducts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addCartProduct.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { updateCartProduct, deleteCartProduct, setCartId } =
  cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartId = (state) => state.cart.cartId;

export default cartSlice.reducer;
