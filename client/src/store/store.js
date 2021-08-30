import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
