import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/ProductsPage/productsSlice";
import userReducer from "../features/Login/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});
