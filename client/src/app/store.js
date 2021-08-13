import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice";
import productsReducer from "../features/ProductsPage/productsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
  },
});
